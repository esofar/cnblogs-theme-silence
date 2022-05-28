import "./index.less";

const loader = {
}

loader.show = () => {
    $('.loading').show();
}

loader.hide = () => {
    $('.loading').fadeOut();
}

export default loader;