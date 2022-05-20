import "./index.less";
import options from '@/consts/options';

function buildPostSignature() {
    const config = options.signature;
    if (config.enable) {
        const postUrl = $('#cb_post_title_url').attr('href');
        const authorName = config.author || currentBlogApp;
        const content =
            `<div class="esa-post-signature"> 
                <p>作者：${$.trim(authorName)}</p> 
                <p>出处：<a href="${postUrl}">${postUrl}</a></p> 
                <p>版权：本作品采用「<a href="${config.license[1]}" target="_blank">${config.license[0]}</a>」许可协议进行许可。</p> 
                <p>${config.remark || ''}</p> 
            </div>`;
        $('#cnblogs_post_body').after(content);
    }
}

export default buildPostSignature;