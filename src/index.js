
import './index.less';
import options from '@consts/options';
import { isPostPage, showSidebar } from '@consts/tools';
import buildGithubCorner from '@components/githubCorner';
import buildCustomHeader from '@components/customHeader';
import buildCustomFooter from '@components/customFooter';
import buildProfile from '@components/profile';
import buildPostContents from '@components/postContents';
import buildPostLightbox from '@components/postLightbox';
import buildHljsLineNumber from '@components/hljsLineNumber';
import buildPostSignature from '@components/postSignature';
import buildPostSponsor from '@components/postSponsor';
import buildPostCommentAvatars from '@components/postCommentAvatars';
import buildToolbar from '@components/toolbar';
import loader from '@components/loader';

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