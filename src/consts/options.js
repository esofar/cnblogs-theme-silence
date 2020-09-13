const defaultOptions = {
    version:'3.0.0',
    avatar: null,
    favicon: null,
    customNavs: [],
    catalog: {
        enable: false,
        move: true,
        index: true,
        level1: 'h2',
        level2: 'h3',
        level3: 'h4',
    },
    signature: {
        enable: true,
        author: null,
        license: '署名-非商业性使用-相同方式共享 4.0 国际',
        link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
        remark: null,
    },
    sponsor: {
        enable: true,
        text: 'Buy me a cup of coffee ☕.',
        paypal: null,
        wechat: null,
        alipay: null,
    },
    github: {
        enable: false,
        color: '#fff',
        target: '_blank',
        fill: null,
        link: null,
    }
};

export default defaultOptions;