var HomeInsertEmployee = {

    Load: function () {
        $('#frmAddNew').on('submit', function (e) {
            HomeInsertEmployee.Submit(e);
        });

        $("#tabs").tabs();
    },

    Submit: function (e) {
        
        var ajxParam = {
            buttonID: 'btn-save',
            formID: 'frmAddNew',
            defaultText: 'Save',
            apiURL: rootPath + 'api/Console/SimpleCrud/InsertEmployee',
            successMessage: 'Success',
            redirectURL: null,
            preRequest: function (o) {
                $(o).find('.lnk-back').addClass('disabled');
                $(o).find('input').attr('disabled', 'disabled');
                $(o).find('select').attr('disabled', 'disabled');
            },
            postRequest: null,
            error: function (r, o) {
                $(o).find('.lnk-back').removeClass('disabled');
                $(o).find('input').removeAttr('disabled');
                $(o).find('select').removeAttr('disabled');
            },
            params: JSON.stringify(
                $('#frmAddNew').serializeArray()
            ),
            obj: $('#frmAddNew'),
            discreet: false
        };

        ajx.SubmitForm(e, ajxParam);
    }

}