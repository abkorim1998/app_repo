(function () {

    // SLIDE THE INFO
    $(document).on('click', '.infoIcon', function () {
        $('.app-info-dection').slideUp('fast');
        $(this).parents('.item').find('.app-info-dection').slideDown('slow');
        return false;
    });
    $(document).on('click', '.cancelIcon', function () {
        $(this).parents('.item').find('.app-info-dection').slideUp('slow');
        return false;
    });

    var settings = {
        "url": "../assets/data/app-list.json",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        for (let i = 0; i < response.length; i++) {
            const appData = response[i];

            var ui = createApp(appData.name, appData.discription, appData.ratting);
            $('.apps-list').append(ui);
        }
    });

    // for (let i = 0; i < 50; i++) {

    // }



    function createApp(title, discription, ratting) {
        var appUI = `
            <div class="item">
            <div class="imag-slide" style="background: url('../assets/img/demo.png');">
                <div class="app-info-dection" style="display: none;">
                    <p class="app-name">${title}</p>
                    <p class="app-info">${discription}</p>
                    <span class="material-icons cancelIcon">cancel</span>
                </div>
                <div class="name">${title}</div>
                <div class="item-tools">
                    <span class="material-icons bookmarkIcon">bookmark_border</span>
                    <a href="#" class="material-icons infoIcon">info</a>
                    <div class="rating-stars">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_half</i>
                        <i class="material-icons">star_border</i>
                    </div>
                </div>
            </div>
            <div class="itemfooter">
                <a href="#" class="download-btn">
                    <span>Download</span>
                    <i class="material-icons">play_for_work</i>
                </a>
            </div>
        </div>
        `;
        return appUI;
    }



})();