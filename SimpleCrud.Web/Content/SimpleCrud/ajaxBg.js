var ajxBg = {

    /*
    var test = {
        apiURL: rootPath + 'Console/MyAction',
        preRequest: function (o) {

        },
        postRequest: function (r, o) {

        },
        obj: $(this)
    };
    */

    ProcessAction: function (ajxParam) {

        if (typeof ajxParam.preRequest === "function") {
            ajxParam.preRequest(ajxParam.obj);
        }


        $.ajax({
            url: ajxParam.apiURL,
            data: ajxParam.params,
            method: 'POST',
            success: function (r) {
                if (r.Status === 200) {
                    if (typeof ajxParam.postRequest === "function") {
                        ajxParam.postRequest(r.Description, ajxParam.obj);
                    }
                } else {
                    if (typeof errorCallback === "function") {
                        errorCallback(r, obj);
                    }
                }
            },
            error: function (r, o) {
                if (typeof errorCallback === "function") {
                    errorCallback(r, o);
                }
            }

        });
    },


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


