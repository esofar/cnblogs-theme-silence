import "./index.less";
import options from '@/consts/options';

function buildCustomFooter() {
    $('#footer').append(`<span class="esa-copyright">& Theme <a href="https://github.com/esofar/cnblogs-theme-silence" target="_blank">Silence v${options.version}</a></span>`);
}

export default buildCustomFooter;