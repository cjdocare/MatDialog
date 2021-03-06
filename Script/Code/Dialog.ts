interface IDialog {
    Title: {
        Label: string,
        ShowClose: boolean
    },
    Content: {
        Label: string,
        Class: string
    },
    ButtonType: string
    Buttons: Array<Button>,
    ExecuteAfter: Function,
    ExecuteBefore: Function
}
module MatDialogs {
    export class Dialog {
        constructor(option) {
            this.createDialog(option);
        }

        createDialog = function (option: IDialog) {
            if (option.ExecuteBefore) {
                option.ExecuteBefore();
            }

            var ElementInnerHTML = '';
            //Title
            if (option.Title) {
                ElementInnerHTML += '<div class="modal-header">'
                if (option.Title.Label) {
                    ElementInnerHTML += '<span class="prompt-msg">' + option.Title.Label + '</span>';
                }
                if (option.Title.ShowClose == undefined || JSON.parse(<any>option.Title.ShowClose)) {
                    ElementInnerHTML += '<i class="modal-button material-icons right-align header-close-icon">&#xE5CD;</i>'
                }
                ElementInnerHTML += '</div><div class="divider"></div>'
            }
            //Content
            if (option.Content) {
                ElementInnerHTML += '<div class="modal-content ' + (option.Content.Class ? option.Content.Class : "") + '">' + option.Content.Label + '</div>';
            }
            //Button
            var BottomHtml = "";
            if (option.ButtonType) {
                var CancelLabel = 'Cancel', OkLabel = 'Ok';
                if (option.ButtonType.toLowerCase() == 'alert') {
                    BottomHtml = '<a href="#" data-val="true" class="modal-button btn waves-effect waves-green prompt btn-ok">' + OkLabel + '</a>';
                }
                else {
                    BottomHtml = '<a href="#" data-val="false" class="modal-button btn waves-effect waves-green prompt btn-cancel" > ' + CancelLabel + ' </a>' +
                        '<a href="#" data-val="true" class="modal-button btn waves-effect waves-green prompt btn-ok">' + OkLabel + '</a>';
                }
            }
            else if (option.Buttons) {
                for (var item, i = option.Buttons.length - 1; i >= 0; i--) {
                    item = option.Buttons[i];
                    BottomHtml += '<a href="#!" data-val="' + item.Value + '" class="modal-button btn waves-effect waves-green btns ' + (item.Class ? item.Class : "") + '">' + item.Label + '</a>';
                }

            }
            if (BottomHtml.length > 0) {
                ElementInnerHTML += '<div class="divider"></div><div class="modal-footer">' + BottomHtml + '</div>';
            }
            $('#divMatDialog .modal').html(ElementInnerHTML).data('type', 'create');
            if (option.ExecuteAfter) {
                option.ExecuteAfter();
            }
        }
    }
}