import "./index.less";
import options from '@/consts/options';

function buildBloggerProfile() {
    const avatar = options.avatar;
    const favicon = options.favicon;
    if (avatar) {
        $('#sideBarMain').prepend(`<img class="esa-profile-avatar" src="${avatar}" />`);
    };
    if (favicon) {
        $('#favicon').attr('hre', favicon);
    }
}

export default buildBloggerProfile;