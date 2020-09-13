import "./index.less";
import options from '@/consts/options';

function buildCustomNavList() {
    const navs = options.customNavs;
    const $navList = $('#navList');

    if (navs && navs.length) {
        navs.forEach((nav) => {
            if (nav.chilren && nav.chilren.length) {
                var subnavs = nav.chilren.map(function (subnav) {
                    return `<li><a class="menu" href="${subnav.url}">${subnav.title}</a></li>`;
                });
                $navList.find('li').eq(1).after(`
                    <li class="esa-has-subnavs">
                        <a class="menu" href="javascript:void(0);">${nav.title}
                            <svg class="arrow" width="9px" height="9px" viewBox="0 0 13 7" xml:space="preserve" fill="none" stroke="var(--text-color)"><path d="M1,1l6.2,6L13,1"></path></svg>
                        </a>
                        <div class="esa-sub-navs"><div class="caret"></div><ul>${subnavs.join('')}</ul></div>
                    </li>`);

            } else {
                $navList.find('li').eq(1).after(`<li><a class="menu" href="${nav.url}">${nav.title}</a></li>`);
            }
        });

        $('li.esa-has-subnavs').hover(function () {
            $(this).find('svg').addClass('open');
            $(this).find('.esa-sub-navs').fadeIn('fast');
        }, function () {
            $(this).find('svg').removeClass('open');
            $(this).find('.esa-sub-navs').hide();
        });
    }

    $.each($navList.children('li'), (index, nav) => {
        if($(nav).children('a').length){
            $(nav).append('<i></i>');
        }else{
            $(nav).remove();
        }
    });

    // var startheight = $(document).scrollTop();
    // var headerHeight = $('#header').outerHeight();
    // $(window).scroll(function () {
    //     var endHeight = $(document).scrollTop();
    //     if (endHeight > headerHeight) {
    //         $('#header').hide();
    //     } else {
    //         $('#header').show();
    //     }
    //     if (endHeight < startheight) {
    //         $('#header').show();
    //     }
    //     startheight = $(document).scrollTop();
    // });

    $('#header').prepend(`<div class="esa-mobile-menu"><i class="fa fa-bars"></i></div>`);
    $('.esa-mobile-menu').on('click', () => {
        $('#navigator').fadeToggle();
    });
}

export default buildCustomNavList;