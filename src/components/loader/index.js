import "./index.less";

const loader = {
}

loader.show = () => {
    $('.esa-loader').show();
}

loader.hide = () => {
    $('.esa-loader').fadeOut();
}

export default loader;