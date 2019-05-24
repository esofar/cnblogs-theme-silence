(function ($) {
    $.extend({
        silence: (options) => {
            var silence = new Silence();
            silence.init(options);
        }
    });

    class Silence {
        constructor() {
            this.defaluts = {
                profile: {
                    enable: false,
                    avatar: null,
                    favicon: null,
                },
                catalog: {
                    enable: false,
                    move: true,
                    index: true,
                    level1: 'h2',
                    level2: 'h3',
                    level3: 'h4',
                },
                signature: {
                    author: null,
                    enable: false,
                    home: 'https://www.cnblogs.com',
                    license: 'CC BY 4.0',
                    link: 'https://creativecommons.org/licenses/by/4.0'
                },
                reward: {
                    enable: false,
                    title: 'Buy Me A Coffee',
                    wechat: null,
                    alipay: null,
                },
                github: {
                    enable: false,
                    color: '#fff',
                    fill: null,
                    link: null,
                }
            };

            this.version = '2.0.0';
        }

        get cnblogs() {
            return {
                header: '#header',
                blogTitle: '#blogTitle',
                publicProfile: '#profile_block',
                navigator: '#navigator',
                navList: '#navList',
                sideBar: '#sideBar',
                sideBarMain: '#sideBarMain',
                forFlow: '.forFlow',
                postTitle: '#cb_post_title_url',
                postDetail: '#post_detail',
                postBody: '#cnblogs_post_body',
                postDigg: '#div_digg',
                postCommentBody: '.blog_comment_body',
                feedbackContent: '.feedbackCon',
                postSignature: '#MySignature',
                footer: '#footer',
            };
        }

        get isPostPage() {
            return $(this.cnblogs.postDetail).length > 0;
        }

        /**
         * 初始化
         * @param {Object} options 全局配置选项
         */
        init(options) {
            if (options) {
                $.extend(true, this.defaluts, options);
            }
            this.buildCustomElements();
            this.buildGithubCorner();
            this.buildCopyright();
            this.buildBloggerProfile();
            if (this.isPostPage) {
                this.goIntoReadingMode();
                this.buildPostCatalog();
                this.buildPostCodeCopyBtns();
                this.buildPostSignature();
                this.buildPostFavoriteBtn();
                this.buildPostRewardBtn();
                this.buildToolbar();
                this.buildPostCommentAvatars();
            } else {
                this.goIntoNormalMode();

            }
        }

        /**
         * 消息弹窗
         * @param {String} content 消息内容
         */
        showMessage(content) {
            $('body').prepend(`<div class="esa-layer"><span class="esa-layer-content">${content}</span></div>`);
            let $layer = $('.esa-layer');
            $layer.fadeIn(200);
            setTimeout(() => {
                $layer.remove();
            }, 2000);
        }

        /**
         * 进入阅读模式
         */
        goIntoReadingMode() {
            let _that = this;
            var oldScrollY = 0;
            let $win = $(window);
            if ($win.width() > 767) {
                $win.scroll(function () {
                    var newScrollY = this.scrollY;
                    if (newScrollY > oldScrollY) {
                        $(_that.cnblogs.header).slideUp('fast');
                    } else {
                        $(_that.cnblogs.header).slideDown('fast');
                    }
                    oldScrollY = this.scrollY;
                });
            }
        }

        /**
         * 进入正常模式
         */
        goIntoNormalMode() {
            let $win = $(window);
            if ($win.width() > 767) {
                $(this.cnblogs.forFlow).css({
                    marginLeft: '22em'
                });
                $(this.cnblogs.sideBar).fadeIn(500);
            }
        }

        /**
         * 构建自定义 DOM 元素
         */
        buildCustomElements() {
            // Change page title.
            const blogTitle = $(this.cnblogs.blogTitle).find('h1 a').html();
            const autherName = $(this.cnblogs.publicProfile).find('a:eq(0)').html();
            let $title = $('head').find('title');
            $title.html($title.html().replace(`${autherName} - 博客园`, `${blogTitle}`));

            // Build a tags button on navbar.
            let $navList = $(this.cnblogs.navList);
            $navList.find('li').eq(1).after(`<li><a id="blog_nav_tags" class="menu" href="https://www.cnblogs.com/${currentBlogApp}/tag">标签</a></li>`);

            $.each($navList.find('li'), (index, nav) => {
                $(nav).append('<i></i>');
            });

            // Build a menu button on mobile browser.
            $('body').prepend(`<div class="esa-mobile-menu"></div>`);
            $('.esa-mobile-menu').on('click', () => {
                $(this.cnblogs.navigator).fadeToggle(200);
            });
        }

        /**
         * 构建主题版权信息
         */
        buildCopyright() {
            // please don't delete this function.
            var content = `<div> Powered By <a href="https://www.cnblogs.com" target="_blank">Cnblogs</a> |
            Theme <a href="https://github.com/esofar/cnblogs-theme-silence" target="_blank">Silence v${this.version}</a></div>`;
            $(this.cnblogs.footer).append(content);
        }

        /**
         * 构建博客签名
         */
        buildPostSignature() {
            const config = this.defaluts.signature;
            if (config.enable) {
                const postUrl = $(this.cnblogs.postTitle).attr('href');
                const authorName = config.author || $(this.cnblogs.publicProfile).find('a:eq(0)').html();

                const content =
                    `<div class="esa-post-signature"> 
                    <p>作者：<a href="${config.home}">${authorName}</a></p> 
                    <p>出处：<a href="${postUrl}">${postUrl}</a></p> 
                    <p>本站使用「<a href="${config.link}"  target="_blank">${config.license}</a>」创作共享协议，转载请在文章明显位置注明作者及出处。</p> 
                </div>`;

                $(this.cnblogs.postSignature).html(content).show();
            }
        }

        /**
         * 构建评论者头像
         */
        buildPostCommentAvatars() {
            var builder = () => {
                $(this.cnblogs.postCommentBody).before(`<div class='esa-comment-avatar'><a target='_blank'><img /></a></div>`);
                let feedbackCon = $(this.cnblogs.feedbackContent);
                for (var i = 0; i < feedbackCon.length; i++) {
                    let avatar = 'https://pic.cnblogs.com/face/sample_face.gif';
                    let span = $(feedbackCon[i]).find("span:last")[0];
                    if (span) {
                        avatar = $(span).html().replace('http://', '//');
                    }
                    $(feedbackCon[i]).find(".esa-comment-avatar img").attr("src", avatar);
                    let href = $(feedbackCon[i]).parent().find(".comment_date").next().attr("href");
                    $(feedbackCon[i]).find(".esa-comment-avatar a").attr("href", href);
                }
            }
            if ($(this.cnblogs.postCommentBody).length) {
                builder();
            } else {
                let count = 1;
                // poll whether the feedbacks is loaded.
                let intervalId = setInterval(() => {
                    if ($(this.cnblogs.postCommentBody).length) {
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

        /**
         * 构建赞赏按钮
         */
        buildPostRewardBtn() {
            const config = this.defaluts.reward;
            if (config.enable) {
                if (!config.wechat && !config.alipay) {
                    this.showMessage(`Error：微信或支付宝赞赏二维码请至少配置一个`);
                    return;
                }
                let content = `<div class="esa-reward">
                <div class="esa-reward-close">✕</div>
                <h2>"${config.title}"</h2>
                <div class="esa-reward-container">`;
                if (config.wechat) {
                    content += `<div class="wechat"><img src="${config.wechat}"></div>`
                }
                if (config.alipay) {
                    content += `<div class="alipay"><img src="${config.alipay}"></div>`;
                }
                content += `</div></div>`;
                $('body').append(content);

                $('.esa-reward-close').on('click', () => {
                    $(".esa-reward").fadeOut();
                });

                let builder = () => {
                    $(this.cnblogs.postDigg).prepend(`<div class="reward"><span class="rewardnum" id="reward_count"></span></div>`);
                    $(this.cnblogs.postDigg).find('.reward').on('click', () => {
                        $(".esa-reward").fadeIn();
                    });
                };

                if ($(this.cnblogs.postDigg).length) {
                    builder();
                } else {
                    let intervalId = setInterval(() => {
                        if ($(this.cnblogs.postDigg).length) {
                            clearInterval(intervalId);
                            builder();
                        }
                    }, 200);
                }
            } else {
                $(this.cnblogs.postDigg).width(300);
            }
        }

        /**
         * 构建收藏按钮
         */
        buildPostFavoriteBtn() {
            let builder = () => {
                $(this.cnblogs.postDigg).prepend(`<div class="favorite" onclick="AddToWz(cb_entryId);return false;"><span class="favoritenum" id="favorite_count"></span></div>`);
            };

            if ($(this.cnblogs.postDigg).length) {
                builder();
            } else {
                let intervalId = setInterval(() => {
                    if ($(this.cnblogs.postDigg).length) {
                        clearInterval(intervalId);
                        builder();
                    }
                }, 200);
            }
        }

        /**
         * 构建博客目录
         */
        buildPostCatalog() {
            const config = this.defaluts.catalog;

            if (config.enable) {
                let levels = [config.level1, config.level2, config.level3];
                let $headers = $(this.cnblogs.postBody).find(levels.join(','));

                if (!$headers.length) {
                    return false;
                }

                let $catalog = $(
                    `<div class="esa-catalog">
                        <div class="esa-catalog-contents">
                            <div class="esa-catalog-title">CONTENTS</div>
                            <a class="esa-catalog-close">✕</a>
                        </div>
                    </div>`);

                let h1c = 0;
                let h2c = 0;
                let h3c = 0;

                let catalogContents = '<ul>';

                let cryptoObj = window.crypto || window.msCrypto; // for IE 11
                let eleIds = cryptoObj.getRandomValues(new Uint32Array($headers.length));

                $.each($headers, (index, header) => {
                    const tagName = $(header)[0].tagName.toLowerCase();
                    let titleIndex = '';
                    let titleContent = $(header).html();
                    let title = titleContent;
                    if (!config.index) {
                        switch (tagName) {
                            case config.level1:
                                titleContent = `<span class="level1">${titleContent}</span>`;
                                break;
                            case config.level2:
                                titleContent = `<span class="level2">${titleContent}</span>`;
                                break;
                            case config.level3:
                                titleContent = `<span class="level3">${titleContent}</span>`;
                                break;
                        }
                    } else {
                        if (tagName === config.level1) {
                            h1c++;
                            h2c = 0;
                            h3c = 0;
                            titleIndex = `<span class="level1">${h1c}. </span>`;
                        } else if (tagName === config.level2) {
                            h2c++;
                            h3c = 0;
                            titleIndex = `<span class="level2">${h1c}.${h2c}. </span>`;
                        } else if (tagName === config.level3) {
                            h3c++;
                            titleIndex = `<span class="level3">${h1c}.${h2c}.${h3c}. </span>`;
                        }
                    }

                    var idx = eleIds[index];

                    catalogContents +=
                        `<li class="li_${tagName}" title="${title}">
                            <i class="${idx}" ></i><a class="esa-anchor-link">${(titleIndex + titleContent)}</a>
                        </li>`;

                    $(header).attr('id', `${idx}`)
                        .html(`<span>${titleContent}</span><a href="#${idx}" class="esa-anchor">#</a>`)
                        .hover(() => {
                            $(header).find('.esa-anchor').css('opacity', 1);
                        }, () => {
                            $(header).find('.esa-anchor').css('opacity', 0);
                        });
                });
                catalogContents += `</ul>`;

                $catalog.find('.esa-catalog-contents').append(catalogContents);
                $catalog.appendTo('body');

                let $tabContent = $('.esa-catalog-contents');

                $tabContent.fadeIn();

                $('.esa-anchor-link').on('click', function () {
                    let position = $('#' + ($(this).prev('i').attr('class'))).offset().top;
                    $('html, body').animate({
                        scrollTop: position
                    }, 300);
                });

                $('.esa-catalog-close').on('click', () => {
                    $tabContent.hide();
                });

                if (config.move) {
                    let move = {
                        start: false,
                        pois: [0, 0],
                    };
                    $('.esa-catalog-title').on('mousedown', function (e) {
                        e.preventDefault();
                        move.start = true;
                        let position = $('.esa-catalog').position();
                        let poisX = e.clientX - parseFloat(position.left);
                        let poisY = e.clientY - parseFloat(position.top);
                        move.pois = [poisX, poisY];
                    });
                    $(document).on('mousemove', (e) => {
                        if (move.start) {
                            let offsetX = e.clientX - move.pois[0];
                            let offsetY = e.clientY - move.pois[1];
                            let fixed = $('.esa-catalog').css('position') === 'fixed';

                            e.preventDefault();

                            move.stX = fixed ? 0 : $(window).scrollLeft();
                            move.stY = fixed ? 0 : $(window).scrollTop();

                            let setRig = $(window).width() - $('.esa-catalog').outerWidth() + move.stX;
                            let setBot = $(window).height() - $('.esa-catalog').outerHeight() + move.stY;

                            offsetX < move.stX && (offsetX = move.stX);
                            offsetX > setRig && (offsetX = setRig);
                            offsetY < move.stY && (offsetY = move.stY);
                            offsetY > setBot && (offsetY = setBot);

                            $('.esa-catalog').css({
                                left: offsetX,
                                top: offsetY,
                                right: 'auto',
                            });
                        }
                    }).on('mouseup', (_e) => {
                        if (move.start) {
                            move.start = false;
                        }
                    });
                }
            }
        }

        /**
         * 构建 Github Corner 
         */
        buildGithubCorner() {
            const config = this.defaluts.github;
            if (config.enable) {
                let fillStyle = config.fill ? `fill:${config.fill};` : '';
                $('body').append(
                    `<a href="${config.link}" class="github-corner" title="Fork me on GitHub">
                        <svg width="60" height="60" viewBox="0 0 250 250" style="${fillStyle} color:${config.color}; z-index: 999999; position: fixed; top: 0; border: 0; left: 0; transform: scale(-1, 1);" aria-hidden="true">
                            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
                        </svg>
                    </a>`);
            }
        }

        /**
         * 构建代码复制按钮
         */
        buildPostCodeCopyBtns() {
            let $pres = $('.postBody .cnblogs-markdown').find('pre');

            if (!$pres.length) {
                return false;
            }

            $.each($pres, (index, pre) => {
                $(pre).find('code').attr('id', `copy_target_${index}`);
                $(pre).prepend(`<div class="esa-clipboard-button" data-clipboard-target="#copy_target_${index}" title="复制代码">Copy</div>`);
            });

            $.getScript(`https://unpkg.com/clipboard@2.0.0/dist/clipboard.min.js`, () => {
                let clipboard = new ClipboardJS('.esa-clipboard-button');
                clipboard.on('success', (e) => {
                    this.showMessage('代码已复制到粘贴板中');
                    e.clearSelection();
                });
                clipboard.on('error', (e) => {
                    this.showMessage('代码复制失败');
                });
            });
        }

        /**
         * 构建工具栏
         */
        buildToolbar() {
            const catalog = this.defaluts.catalog;

            $('body').append(`<div class="esa-toolbar">
                <button class="esa-toolbar-gotop"><div class="tips">返回顶部</div></button>
                <button class="esa-toolbar-contents"><div class="tips">阅读目录</div></button>
                <button class="esa-toolbar-follow"><div class="tips">关注博主</div></button>
            </div>`);

            let $btnGotop = $('.esa-toolbar-gotop');
            let $btnContents = $('.esa-toolbar-contents');
            let $btnFollow = $('.esa-toolbar-follow');
            
            if (catalog.enable) {
                $btnContents.on('click', () => {
                    let $catalog = $('.esa-catalog-contents');
                    if ($catalog.css('display') == 'none') {
                        $catalog.fadeIn();
                    } else {
                        $catalog.hide();
                    }
                }).hover(() => {
                    $btnContents.find('.tips').show();
                }, () => {
                    $btnContents.find('.tips').hide();
                });
            } else {
                $btnContents.remove();
            }

            $btnGotop.on('click', () => {
                $(window).scrollTop(0);
            }).hover(() => {
                $btnGotop.find('.tips').show();
            }, () => {
                $btnGotop.find('.tips').hide();
            });

            $(window).scroll(function () {
                if (this.scrollY > 200) {
                    $btnGotop.fadeIn();
                } else {
                    $btnGotop.fadeOut();
                }
            });

            $btnFollow.on('click', () => {
                loadLink(location.protocol + "//common.cnblogs.com/scripts/artDialog/ui-dialog.css", () => {
                    loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-min.js", () => {
                        if (!isLogined) {
                            return login();
                        }
                        if (c_has_follwed) {
                            return this.showMessage('您已经关注过该博主');
                        }
                        const n = cb_blogUserGuid;
                        $.ajax({
                            url: "/mvc/Follow/FollowBlogger.aspx",
                            data: '{"blogUserGuid":"' + n + '"}',
                            dataType: "text",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: (msg) => {
                                msg == "未登录" ? login() : (msg == "关注成功" && followByGroup(n, !0));
                                this.showMessage(msg);
                            }
                        })
                    })
                })
            }).hover(() => {
                $btnFollow.find('.tips').show();
            }, () => {
                $btnFollow.find('.tips').hide();
            });
        }

        /**
         * 构建博主信息
         */
        buildBloggerProfile() {
            const config = this.defaluts.profile;

            if (!config.enable) {
                return;
            }

            if (!this.isPostPage && config.avatar) {
                $(this.cnblogs.sideBarMain).prepend(`<img class="esa-profile-avatar" src="${config.avatar}" />`);
            };

            if (config.favicon) {
                $('head').append(`<link rel="shortcut icon" href="${config.favicon}" type="image/x-icon" />`);
            }
        }
    }
})(jQuery);
