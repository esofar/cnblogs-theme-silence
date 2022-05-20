import "./index.less";
import { lightbox } from '@consts/lib';

function buildPostLightbox() {
    $('head').append(`<link rel="stylesheet" href="${lightbox.css}"/>`);
    $.getScript(lightbox.js, () => {
        $('#cnblogs_post_body').find('img').wrap(function () {
            const src = $(this).attr("src");
            const title = $(this).attr("title") || '';
            const alt = $(this).attr("alt") || '';
            return `<a href="${src}" data-title="${title}" data-alt="${alt}" data-lightbox="roadtrip"></a>`;
        });
        $(".code_img_closed, .code_img_opened, .cnblogs_code_copy img").unwrap();
    });

}

export default buildPostLightbox;