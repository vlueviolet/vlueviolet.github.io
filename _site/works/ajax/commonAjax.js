/**
 * ajax 공통
 */
var SendAjax = function () {}

SendAjax.prototype = {
    grobalHandler: function () {
        var processSpinner = new ProcessSpinner();

        $(document).ajaxSend(function (event, jqxhr, settings) {
            processSpinner.show();
        })

        $(document).ajaxStop(function () {
            processSpinner.hide();
        })

        $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
            console.error('ajax error...', {
                url: settings.url,
                thrownError: thrownError
            });
        })
    },
    get: function (url, callback) {
        var options = {
            url: url,
            success: function (response) {
                if (!callback && typeof callback !== 'function') {
                    console.error('no callback..', typeof callback)
                    return false;
                }
                callback(response)
            }
        }
        $.ajax(options)
    },
    getParam: function (url, param, callback) {
        var options = {
            url: url,
            data: param,
            success: function (response) {
                if (!callback && typeof callback !== 'function') {
                    console.error('no callback..', typeof callback)
                    return false;
                }
                callback(response)
            }
        }
        $.ajax(options)
    },
    postMultipart: function (url, formData, callback) {
        var options = {
            type: 'post',
            url: url,
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            success: function (response) {
                if (!callback && typeof callback !== 'function') {
                    console.error('no callback..', typeof callback)
                    return false;
                }
                callback(response);
            }
        }
        $.ajax(options);
    },
    postJson: function (url, jsonObject, callback) {
        var options = {
            url: url,
            method: 'post',
            cache: false,
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(jsonObject),
            success: function (response) {
                if (!callback && typeof callback !== 'function') {
                    console.error('no callback..', typeof callback)
                    return false;
                }
                callback(response);
            }
        }
        $.ajax(options);
    }
}

var sendAjax = new SendAjax();
sendAjax.grobalHandler()