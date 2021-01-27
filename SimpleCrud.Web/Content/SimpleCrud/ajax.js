var ajx = {
    _buttonID: '',
    _formID: '',
    _defaultText: '',
    _redirectURL: '',
    _successMessage: '',
    _inProgress: false,
    _discreet: false,

    SubmitForm: function (e, ajxParam) {
        e.preventDefault();

        if (ajx._inProgress) {
            ajx._abort();
            return;
        }

        ajx.ProcessAction(ajxParam);
    },

    ProcessAction: function (ajxParam) {


        if (
            (ajxParam.successMessage === undefined) ||
            (ajxParam.successMessage === null) ||
            (ajxParam.successMessage === '')) {
            ajxParam.successMessage = 'Success';
        }

        if (
            (ajxParam.redirectURL === undefined) ||
            (ajxParam.redirectURL === null) ||
            (ajxParam.redirectURL === '')) {
            ajxParam.redirectURL = 'stay';
        }

        if (
            (ajxParam.params === undefined) ||
            (ajxParam.params === null) ||
            (ajxParam.params === '')) {
            ajxParam.params = '';
        }

        if (
            (ajxParam.preRequest === undefined) ||
            (ajxParam.preRequest === null) ||
            (ajxParam.preRequest === '')) {
            ajxParam.preRequest = '';
        }

        if (
            (ajxParam.postRequest === undefined) ||
            (ajxParam.postRequest === null) ||
            (ajxParam.postRequest === '')) {
            ajxParam.postRequest = '';
        }

        if (
            (ajxParam.discreet === undefined) ||
            (ajxParam.discreet === null) ||
            (ajxParam.discreet === '')) {
            ajxParam.discreet = false;
        }

        if (
            (ajxParam.obj === undefined) ||
            (ajxParam.obj === null) ||
            (ajxParam.obj === '')) {
            ajxParam.obj = {};
        }

        if (
            (ajxParam.error === undefined) ||
            (ajxParam.error === null) ||
            (ajxParam.error === '')) {
            ajxParam.error = '';
        }

        if (ajxParam.discreet === false) {
            if (ajx._inProgress) {
                ajx._abort();
                return;
            }
            ajx._inProgress = true;
        } else {
            ajx._inProgress = false;
        }


        ajx._buttonID = ajxParam.buttonID;
        ajx._formID = ajxParam.formID;
        ajx._defaultText = ajxParam.defaultText;
        ajx._redirectURL = ajxParam.redirectURL;
        ajx._successMessage = ajxParam.successMessage;
        ajx._discreet = ajxParam.discreet;

        $('span[class="field-validation-valid text-danger"]').each(function (index, element) {
            $(element).text('');
        });

        if (ajx._buttonID !== null) {
            
            $('input[class="btn btn-primary ' + ajx._buttonID + '"]').each(function (index, element) {
                $(element).attr('value', 'Processing...');
                $(element).attr('disabled', 'disabled');
            });

            $('input[class="btn btn-secondary ' + ajx._buttonID + '"]').each(function (index, element) {
                $(element).attr('value', 'Processing...');
                $(element).attr('disabled', 'disabled');
            });

            $('input[class="btn btn-danger ' + ajx._buttonID + '"]').each(function (index, element) {
                $(element).attr('value', 'Processing...');
                $(element).attr('disabled', 'disabled');
            });
        }

        var param;
        var noParamFormID = [];
        if (ajxParam.params !== '') {
            param = JSON.parse(ajxParam.params);
        } else {
            if ($.inArray(ajx._formID, noParamFormID) >= 0) {
                param = null;
            } else {
                param = $('#' + ajx._formID).serializeArray();
            }
        }

        ajx._SendRequest(ajxParam.apiURL, param, ajxParam.preRequest, ajxParam.postRequest, ajxParam.obj, ajxParam.error);
    },

    _SendRequest: function (apiURL, param, preRequest = null, postRequest = null, obj = null, errorCallback = null) {

        if (ajx._discreet === false) {
            ajx.ToastLoading.fire({
                icon: 'info',
                title: 'Processing Your Request'
            });
        }

        if (typeof preRequest === "function") {
            preRequest(obj);
        }

        $.ajax({
            url: apiURL,
            data: param,
            method: 'post',
            cache: 'false',
            success: function (response) {
                ajx._UpdateUI(response, postRequest, obj, errorCallback);
            },
            error: function (r) {

                if (typeof errorCallback === "function") {
                    errorCallback(r, obj);
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to connect to server'
                });

                if (ajx._buttonID !== null) {
                    $('input[class="btn btn-primary ' + ajx._buttonID + '"]').each(function (index, element) {
                        $(element).attr('value', ajx._defaultText);
                        $(element).removeAttr('disabled');
                    });

                    $('input[class="btn btn-secondary ' + ajx._buttonID + '"]').each(function (index, element) {
                        $(element).attr('value', ajx._defaultText);
                        $(element).removeAttr('disabled');
                    });

                    $('input[class="btn btn-danger ' + ajx._buttonID + '"]').each(function (index, element) {
                        $(element).attr('value', ajx._defaultText);
                        $(element).removeAttr('disabled');
                    });
                }
                ajx._inProgress = false;
            }
        });
    },

    _UpdateUI: function (response, postRequest = null, obj = null, errorCallback = null) {
        if (response.Status === 200) {

            if (ajx._discreet === false) {
                ajx.Toast.fire({
                    icon: 'success',
                    title: 'Ready'
                });
            }

            if (response.Description !== undefined) {
                if (response.Description !== "OK") {
                    ajx._successMessage = response.Description;
                }
            }

            if (typeof postRequest === "function") {
                postRequest(response.Description, obj);
            } else {
                if ((response.Url === undefined) || (response.Url === null)) {
                    if (!ajx._discreet) {
                        ajx.Toast.fire({
                            icon: 'success',
                            title: ajx._successMessage.toString()
                        });
                    }
                } else {
                    Swal.fire({ icon: "success", html: ajx._successMessage }).then(function () {
                        if ((response.Url !== undefined) || (response.Url !== null)) {
                            $(location).attr('href', response.Url);
                        } else {
                            if (ajx._redirectURL !== "stay") {
                                $(location).attr('href', ajx._redirectURL);
                            }
                        }
                    });
                }
            }

        } else if (response.Status === 401) {
            Swal.fire({
                icon: 'error',
                text: 'Invalid Session'
            }).then(function () {
                $(location).attr('href', rootPath + 'Profile/Signout');
            });

        } else if (response.Status === 406) {
            $.each(response.Validation, function (i, o) {
                var errorMsg = "";
                $.each(response.Validation[i].Errors, function (i2, o2) {
                    errorMsg = errorMsg + response.Validation[i].Errors[i2] + ' ';
                });
                $('span[data-valmsg-for="' + response.Validation[i].Name + '"]').text(errorMsg);
            }) 

            ajx.Toast.fire({
                icon: 'error',
                title: 'Required Fields Are Missing Or Invalid'
            });

            if (typeof errorCallback === "function") {
                errorCallback('Required Fields Are Missing Or Invalid', obj);
            }
        
        } else if (response.Status === 500) {

            if (response.Description !== undefined) {
                ajx.Toast.fire({
                    icon: 'error',
                    title: response.Description
                });
            } else {

                ajx.Toast.fire({
                    icon: 'error',
                    title: 'Server returned an unexpected response'
                });

                //ajx.Toast.fire({
                //    icon: 'error',
                //    title: 'Required Fields Are Missing Or Invalid'
                //});

                //for (var i = 0; i < response.length; i++) {
                //    $('span[data-valmsg-for="' + response[i].key + '"]').text(response[i].errors[0]);
                //}
            }

            if (typeof errorCallback === "function") {
                errorCallback(response.Description, obj);
            }
        } else {
            if (response[0].key === undefined) {
                ajx.Toast.fire({
                    icon: 'error',
                    title: 'Server returned an unexpected response (500)'
                });
            } else {

                ajx.Toast.fire({
                    icon: 'error',
                    title: 'Required Fields Are Missing Or Invalid (500)'
                });

                for (var i = 0; i < response.length; i++) {
                    $('span[data-valmsg-for="' + response[i].key + '"]').text(response[i].errors[0]);
                }
            }

            if (typeof errorCallback === "function") {
                errorCallback(response.Description, obj);
            }
        }

        if (ajx._buttonID !== null) {

            $('input[class="btn btn-primary ' + ajx._buttonID + '"]').each(function (index, element) {
                $(element).attr('value', ajx._defaultText);
                $(element).removeAttr('disabled');
            });

            $('input[class="btn btn-secondary ' + ajx._buttonID + '"]').each(function (index, element) {
                $(element).attr('value', ajx._defaultText);
                $(element).removeAttr('disabled');
            });

            $('input[class="btn btn-danger ' + ajx._buttonID + '"]').each(function (index, element) {
                $(element).attr('value', ajx._defaultText);
                $(element).removeAttr('disabled');
            });
        }
        
        ajx._inProgress = false;
    },

    _abort: function () {
        ajx.ToastLoading.fire({
            icon: 'error',
            title: 'Pending actions in progress'
        });
    },

    ToastLoading: (function () {
        return Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    })(),

    Toast: (function () {
        return Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    })(),

    Encode: function (param, fieldsArray) {
        for (fIndex = 0; fIndex < fieldsArray.length; ++fIndex) {
            for (index = 0; index < param.length; ++index) {
                if (param[index].name === fieldsArray[fIndex]) {
                    param[index].value = Base64.encode($('#' + fieldsArray[fIndex]).val());
                    break;
                }
            }
        }
        return param;
    },
};