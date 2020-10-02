import "./index.less";

const loader = {
}

loader.show = () => {
    $('.esa-loader, .dark-loading').show();
}

loader.hide = () => {
    $('.esa-loader, .dark-loading').fadeOut();
}

export default loader;