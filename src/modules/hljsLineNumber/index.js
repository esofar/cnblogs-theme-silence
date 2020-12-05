import "./index.less";
import options from '@/consts/options';

function buildHljsLineNumber() {
    let $codes = $('.postBody .cnblogs-markdown').find('pre code');
    if (!$codes.length) {
        return false;
    }

    $.each($codes, (_, code) => {
        if (!$(code).hasClass('hljsln')) {
            $(code).addClass('hljsln');
            if (!options.hljsln) {
                $(code).addClass('ln-hide');
                return true;
            }
            $(code).html(addLineNumbersFor($(code).html()));
            var $lastNum = $('span[data-num]:last');
            if (!$lastNum.html()) {
                $lastNum.remove();
            }
        }
    });
}

function addLineNumbersFor(html) {
    var text = html.replace(/<span[^>]*>|<\/span>/g, '');
    if (/\r|\n$/.test(text)) {
        html += '<span class="ln-eof"></span>';
    }
    var num = 1;
    html = html.replace(/\r\n|\r|\n/g, function (a) {
        num++;
        return a + '<span class="ln-num" data-num="' + num + '"></span>';
    });
    html = '<span class="ln-num" data-num="1"></span>' + html;
    html = '<span class="ln-bg"></span>' + html;
    return html;
}

export default buildHljsLineNumber;