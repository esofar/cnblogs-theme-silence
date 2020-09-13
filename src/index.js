
import './index.less';
import defaultOptions from '@consts/options';
import { isPostPage, showSidebar } from '@consts/tools';

import buildGithubCorner from '@components/githubCorner';
import buildCustomNavList from '@components/customNavList';
import buildCustomFooter from '@components/customFooter';
import buildBloggerProfile from '@components/bloggerProfile';
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
        $.extend({
            silence: options => {
                if (options) {
                    $.extend(true, defaultOptions, options);
                }
                this.building();
            },
        })
    }

    building() {
        buildBloggerProfile();
        buildGithubCorner();
        buildCustomFooter();
        buildCustomNavList();
        buildToolbar();
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