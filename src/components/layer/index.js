import "./index.less";

export function message(content) {
    $('body').prepend(`<div class="esa-layer"><span class="content">${content}</span></div>`);
    let $layer = $('.esa-layer');
    $layer.slideDown(200);
    setTimeout(() => {
        $layer.remove();
    }, 2000);
}