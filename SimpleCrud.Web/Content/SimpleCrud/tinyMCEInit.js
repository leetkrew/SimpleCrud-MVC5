var tmce2 = {
    generateAlias: function (title) {
        title = title.replace(/[^\w\s]/gi, '-');
        title = title.replace(/\s+/g, '-');
        return title;
    },
    insertImageToEditor: function (id) {
        var html = "<img src='/Contents/media/{U_IMGID}' alt='{U_IMGID}' />";
        html = html.replace(/{U_IMGID}/g, id);
        tinymce.activeEditor.execCommand('mceInsertContent', false, html);
    },

    init: function () {

        $('#btnManageImages').on('click', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: "",
                html: "not yet implemented"
            });
        });

        $('#btnInsertImage').on('click', function (e) {
            e.preventDefault();
            $.ajax({
                url: rootPath + 'Articles/ListImage',
                method: 'get',
                success: function (data) {
                    var itemTemplate = "";
                    var tplInnerHtml = "";
                    var tplContainerTemplate = "";

                    tplContainerTemplate = $('#imageListContainerTemplate').html();

                    $.each(data.Images, function (x, y) {
                        itemTemplate = $('#imageListInnerTemplate').html();
                        tplInnerHtml = tplInnerHtml + itemTemplate.replace(/{U_IMGID}/g, y.ImgID);
                    });

                    tplContainerTemplate = tplContainerTemplate.replace(/{U_IMGLIST}/g, tplInnerHtml);
                    Swal.fire({ icon: "", html: tplContainerTemplate });
                },
                error: function (data) {
                    //Swal.fire({ icon: "error", html: 'Unable to load' }); 
                }
            });
        });

        tinymce.init({
            selector: "textarea",
            //plugins: "lists table codesample media link image code",
            plugins: "lists table codesample link image code",
            image_list: rootPath + 'Articles/ListImageMce',
            menubar: "insert tools",
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'PHP', value: 'php' },
                { text: 'Ruby', value: 'ruby' },
                { text: 'Python', value: 'python' },
                { text: 'Java', value: 'java' },
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' },
                { text: 'SQL', value: 'sql' }
            ],
            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | numlist bullist | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | codesample | media link code',
            encoding: 'xml',

            images_upload_url: rootPath + 'Articles/UploadImage',

            images_upload_handler: function (blobInfo, success, failure) {
                var xhr, formData;

                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', rootPath + 'Articles/UploadImage');

                xhr.onload = function () {
                    var json;

                    if (xhr.status !== 200) {
                        failure('HTTP Error: ' + xhr.status);
                        return;
                    }

                    json = JSON.parse(xhr.responseText);

                    if (!json) {
                        failure('Unknown Error');
                    }

                    if (json.status !== 200) {
                        failure(json.description);
                    }

                    //if (!json || typeof json.location !== 'string') {
                    //    failure('Invalid JSON: ' + xhr.responseText);
                    //    return;
                    //}

                    success(json.description);
                };

                formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());

                xhr.send(formData);
            }

        }).then(function (e) {
            //tinymce.activeEditor.execCommand('mceCodeEditor');
        });

        $('#Title').on('change', function (e) {
            $('#ArticleAlias').val(tmce2.generateAlias($('#Title').val()));
        });
    }

};