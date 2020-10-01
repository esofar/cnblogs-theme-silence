import './index.less';
import options from '@consts/options';
import { isPostPage, showSidebar } from '@consts/tools';
import buildGithubCorner from '@modules/githubCorner';
import buildCustomHeader from '@modules/customHeader';
import buildCustomFooter from '@modules/customFooter';
import buildProfile from '@modules/profile';
import buildPostContents from '@modules/postContents';
import buildPostLightbox from '@modules/postLightbox';
import buildHljsLineNumber from '@modules/hljsLineNumber';
import buildPostSignature from '@modules/postSignature';
import buildPostSponsor from '@modules/postSponsor';
import buildPostCommentAvatars from '@modules/postCommentAvatars';
import buildToolbar from '@modules/toolbar';
import loader from '@modules/loader';

class Silence {
    constructor() {
        this.init();
    }

    init() {
        const userOptions = window.$silence;
        if (userOptions) {
            $.extend(true, options, userOptions);
        }
        this.building();
    }

    building() {
        buildCustomHeader();
        buildCustomFooter();
        buildProfile();
        buildToolbar();
        buildGithubCorner();
        if (isPostPage()) {
            buildPostContents();
            buildPostLightbox();
            buildHljsLineNumber();
            buildPostSignature();
            buildPostSponsor();
            buildPostCommentAvatars();
        } else {
            showSidebar();
        }
        loader.hide();
    }
}

new Silence();