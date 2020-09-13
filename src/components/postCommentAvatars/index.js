import "./index.less";

function buildPostCommentAvatars() {
    const postCommentBody = '.feedbackItem > .feedbackCon > .blog_comment_body';
    const builder = () => {
        $(postCommentBody).before(`<div class='esa-comment-avatar'><a target='_blank'><img /></a></div>`);
        let $feedbackContents =$('.feedbackItem > .feedbackCon');
        $.each($feedbackContents, function(index, feedbackContent){
            let avatarUrl = null;
            let container = $(feedbackContent).find('span[id$="avatar"]');
            if (container.length) {
                avatarUrl = $.trim($(container).text());
            }
            $(feedbackContent).find(".esa-comment-avatar img").attr("src", avatarUrl || 'https://pic.cnblogs.com/face/sample_face.gif');
            const blogUrl = $(feedbackContent).parent().find(".comment_date").next().attr("href");
            $(feedbackContent).find(".esa-comment-avatar a").attr("href", $.trim(blogUrl));
        })
    }
    if ($(postCommentBody).length) {
        builder();
    } else {
        let count = 1;
        // poll whether the feedbacks is loaded.
        let intervalId = setInterval(() => {
            if ($(postCommentBody).length) {
                clearInterval(intervalId);
                builder();
            }
            if (count == 10) {
                // no feedback.
                clearInterval(intervalId);
            }
            count++;
        }, 500);
    }
}

export default buildPostCommentAvatars;