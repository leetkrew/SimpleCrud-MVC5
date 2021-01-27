var HomeIndex = {
    Load: function () {

        $('#frmEdit').on('submit', function (e) {
            HomeIndex.Update(e);
        });

        $('#btn-delete').on('click', function (e) {
            HomeIndex.Delete(
                $('#EmployeeID').val()
            );
        });



        $("#tabs").tabs();
        HomeIndex.GetEmployees();
    },

    GetEmployees: function () {
        var params = {
            EmployeeID: 0
        };

        var ajxParam = {
            buttonID: null,
            formID: null,
            defaultText: null,
            apiURL: rootPath + 'api/Console/SimpleCrud/ListEmployees',
            successMessage: 'Success',
            redirectURL: null,
            preRequest: function (o) {
                $(o).html('<tr><td colspan="6" align="center"><img src="' + rootPath + 'Content/images/ajax-loader.gif" /></td></tr>');
            },
            postRequest: function (r, o) {
                $('#employees').unbind();
                HomeIndex.PopulateTable(r);
            },
            error: function (r, o) {
                $(o).html('<tr><td colspan="6" align="center">' + r + '</td></tr>');
            },
            params: JSON.stringify(params),
            obj: $('#employees').find($('tbody')),
            discreet: false
        };

        ajx.ProcessAction(ajxParam);
    },

    PopulateTable: function (r) {
        r = $.parseJSON(r);
        $("[href='#tabs-1']").trigger('click');

        var table1 = $('#employees').DataTable();
        table1.destroy();
        table1.clear();

        table1 = $('#employees').DataTable({
            "data": r,
            "destroy": true,
            "columns": [
                { "data": "EmployeeID" },
                { "data": "FullName" },
                { "data": "Position" },
                { "data": "EmpCode" },
                { "data": "Mobile" },

                {
                    "data": "&nbsp;",
                    "defaultContent": "<span class='employeeActionView'>Edit</span>",
                    "render": function (data, type, full, meta) {
                        var EmployeeID = full.EmployeeID;
                        return '<a data-val=' + EmployeeID + ' class="employeeActionView" role="button">Edit</a>'
                    }
                }
            ],
            initComplete: function () {
                this.api().columns().every(function () {
                    var column = this;
                    var select = $('<select class="form-control col-md-3"><option value=""></option></select>')
                        .appendTo($(column.footer()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function (d, j) {
                        if (d !== null) {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        }
                    });
                });
            },
            "iDisplayLength": 10,
            responsive: true,
            columnDefs: [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },
                { responsivePriority: 1, targets: -1 },
                { responsivePriority: 2, targets: -4 }

            ],
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print',
                {
                    text: 'Insert',
                    action: function (e, dt, button, config) {
                        window.location = './Home/InsertEmployee';
                    }
                }
            ]
        });

        $('#employees').find('tfoot').find('tr:last').find('td:last').html('');

        $('#employees').on('click', '.employeeActionView', function () {
            var params = {
                EmployeeID: $(this).attr('data-val'),
            };

            var ajxParam = {
                buttonID: null,
                formID: null,
                defaultText: null,
                apiURL: rootPath + 'api/Console/SimpleCrud/ListEmployees',
                successMessage: 'Success',
                redirectURL: null,
                preRequest: function (o) {
                    $('#tab2pretext').removeClass('hidden');
                    $('#tab2pretext').html('<img src="' + rootPath + 'Content/images/ajax-loader.gif" />');
                    $('#frmEdit').addClass('hidden');
                    $("[href='#tabs-2']").trigger('click');
                },
                postRequest: function (r, o) {
                    r = JSON.parse(r)[0];

                    $('#tab2pretext').html('Please select an employee');
                    $('#tab2pretext').addClass('hidden');
                    $('#frmEdit').removeClass('hidden');
                                        
                    $('#EmployeeID').val(r.EmployeeID);
                    $('#FullName').val(r.FullName);
                    $('#Position').val(r.Position);
                    $('#EmpCode').val(r.EmpCode);
                    $('#Mobile').val(r.Mobile);
                },
                error: function (r, o) {
                    $('#tab2pretext').removeClass('hidden');
                    $('#tab2pretext').html('<span class=\'text-danger\'>' + r + '</span>');
                    $('#frmEdit').addClass('hidden');
                    $("[href='#tabs-2']").trigger('click');
                },
                params: JSON.stringify(params),
                obj: $('#tabs-2'),
                discreet: false
            };

            ajx.ProcessAction(ajxParam);

        });
    },

    Update: function (e) {
        var ajxParam = {
            buttonID: 'btn-update',
            formID: 'frmEdit',
            defaultText: 'Update',
            apiURL: rootPath + 'api/Console/SimpleCrud/UpdateEmployee',
            successMessage: 'Success',
            redirectURL: null,
            preRequest: function (o) {
                HomeIndex.DisableFormElements();
            },
            postRequest: function (r, o) {
                HomeIndex.EnableFormElements();
                HomeIndex.PopulateTable(r);
            },
            error: function (r, o) {
                HomeIndex.EnableFormElements();
            },
            params: JSON.stringify(
                $('#frmEdit').serializeArray()
            ),
            obj: $(this),
            discreet: false
        };

        ajx.SubmitForm(e, ajxParam);
    },

    Delete: function (employeeID) {

        var params = {
            EmployeeID: employeeID
        };

        var ajxParam = {
            buttonID: 'btn-update',
            formID: 'frmEdit',
            defaultText: 'Update',
            apiURL: rootPath + 'api/Console/SimpleCrud/DeleteEmployee',
            successMessage: 'Success',
            redirectURL: null,
            preRequest: function (o) {
                HomeIndex.DisableFormElements();
            },
            postRequest: function (r, o) {
                HomeIndex.EnableFormElements();
                HomeIndex.PopulateTable(r);
            },
            error: function (r, o) {
                HomeIndex.EnableFormElements();
            },
            params: JSON.stringify(params),
            obj: $(this),
            discreet: false
        };

        ajx.ProcessAction(ajxParam);
    },


    EnableFormElements: function () {
        $('input').removeAttr('disabled');
        $('select').removeAttr('disabled');
    },

    DisableFormElements: function () {
        $('input').attr('disabled', 'disabled');
        $('select').attr('disabled', 'disabled');
    }
}