$(window).on('load', function () {

    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
        window.scrollTo(0, 0);
    }
    var grid = new Muuri('.grid', {
        showDuration: 600,
        showEasing: 'cubic-bezier(0.215,0.61,0.355,1)',
        hideDuration: 600,
        hideEasing: 'cubic-bezier(0.215,0.61,0.35,1)',

        visibleStyles: {
            opacity: '1',
            transform: 'scale(1)'
        },
        hiddenStyles: {
            opacity: '0',
            transform: 'scale(0.5)'
        }
    });

    Fancybox.bind("[data-fancybox]", {
        // 必要なオプションがあればここに書きます
    });

    $('.sort-btn ul li').on('click', function () {
        // hasClassを使って判定したほうが確実なので少し書き換えています
        var isAll = $(this).hasClass('all');

        if ($(this).hasClass('active')) {
            // ■ すでにアクティブなボタンを押した場合（解除操作）
            if (!isAll) {
                $(this).removeClass("active");
                var secletElms = $(".sort-btn ul li.active");
                if (secletElms.length == 0) {
                    $(".sort-btn ul li.all").addClass("active");
                    grid.filter('*'); // ★修正：全表示は show('') ではなく filter('*')
                } else {
                    filterDo();
                }
            }
        } else {
            // ■ アクティブじゃないボタンを押した場合（選択操作）
            if (isAll) {
                // ALLが押されたら他を解除して全表示
                $(".sort-btn ul li").removeClass("active");
                $(this).addClass("active");
                grid.filter('*'); // ★修正：全表示は filter('*')
            } else {
                // 他のボタンが押されたらALLを解除してフィルタ実行
                if ($(".all").hasClass('active')) {
                    $(".sort-btn ul li.all").removeClass("active");
                }
                $(this).addClass('active');
                filterDo();
            }
        }
    });

    function filterDo() {
        var selectElms = $(".sort-btn ul li.active");
        var selectElemAry = [];
        $.each(selectElms, function (index, secletElms) {
            var className = $(this).attr("class");

            // ★重要修正：splitの中に半角スペースを入れてください
            className = className.split(' ');

            // クラス名配列の先頭（例: "game"）を使ってフィルタを作成
            selectElemAry.push("." + className[0]);
        })
        str = selectElemAry.join(',');
        grid.filter(str);
    }
});