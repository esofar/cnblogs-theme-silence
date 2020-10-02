import "./index.less";

const loader = {
}

loader.show = () => {
    $('.light-loading, .dark-loading').show();
}

loader.hide = () => {
    $('.light-loading, .dark-loading').fadeOut();
}

export default loader;