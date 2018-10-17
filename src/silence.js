(function ($) {
    $.extend({
        silence: function (options) {
            var silence = new Silence();
            silence.init(options);
        }
    });

    class Silence {
        constructor() {
            this.defaluts = {
                catalog: {
                    enable: false,
                    move: true,
                    index: true,
                    level1: 'h2',
                    level2: 'h3',
                    level3: 'h4',
                },
                signature: {
                    enable: false,
                    author: currentBlogApp || '--',
                    home: 'https://www.cnblogs.com',
                    license: '署名 4.0 国际',
                    link: 'https://creativecommons.org/licenses/by/4.0'
                },
                reward: {
                    enable: false,
                    title: null,
                    wechat: null,
                    alipay: null,
                }
            };
        }

        get version() {
            return 'v1.0.8';
        }

        get cnblogs() {
            return {
                header: '#header',
                navigator: '#navigator',
                navList: '#navList',
                sideBar: '#sideBar',
                forFlow: '.forFlow',
                postTitle: '#cb_post_title_url',
                postDetail: '#post_detail',
                postBody: '#cnblogs_post_body',
                postCommentBody: '.blog_comment_body',
                feedbackContent: '.feedbackCon',
                mySignature: '#MySignature',
                footer: '#footer',
            };
        }

        get isPostDetail() {
            return $(this.cnblogs.postDetail).length > 0;
        }

        /**
         * 初始化
         * @param {Object} options 配置选项
         */
        init(options) {
            if (options) {
                $.extend(true, this.defaluts, options);
            }
            this.buildNavHoverDom();
            this.buildMobileMenu();
            this.buildCopyright();

            if (this.isPostDetail) {
                this.goIntoReadingMode();
                this.buildPostCatalog();
                this.buildPostSignature();
                this.buildPostFavoriteBtn();
                this.buildPostRewardBtn();
                this.buildPostCommentAvatar();
            } else {
                this.goIntoNormalMode();
            }
        }

        /**
         * 消息弹窗
         * @param {String} content 消息内容
         */
        showMessage(content) {
            let $layer = $('.esa-layer');
            if (!$layer.length) {
                $('body').prepend('<div class="esa-layer"><span class="esa-layer-content"></span></div>');
            }
            $('.esa-layer-content').html(content);
            $('.esa-layer').fadeIn(250);
            setTimeout(function () {
                $('.esa-layer').fadeOut(500, function () {
                    $('.esa-layer-content').empty();
                });
            }, 2500);
        }

        /**
         * 进入阅读模式
         */
        goIntoReadingMode() {
            let _that = this;
            let $win = $(window);
            if ($win.width() > 767) {
                $win.scroll(function () {
                    if (this.scrollY > 150) {
                        $(_that.cnblogs.header).slideUp();
                    } else {
                        $(_that.cnblogs.header).slideDown();
                    }
                });
            }
        }

        /**
         * 进入正常模式
         */
        goIntoNormalMode() {
            let _that = this;
            let $win = $(window);
            if ($win.width() > 767) {
                $(_that.cnblogs.forFlow).css({
                    marginLeft: '22em'
                });
                $(_that.cnblogs.sideBar).fadeIn(700);
            }
        }

        /**
         * 构建导航栏选项追加DOM元素
         */
        buildNavHoverDom() {
            var $lis = $(this.cnblogs.navList).find('li');
            $.each($lis, function (index, ele) {
                $(ele).append('<i></i>');
            });
        }

        /**
         * 构建移动端菜单按钮
         */
        buildMobileMenu() {
            let _that = this;
            $('body').prepend('<div class="esa-mobile-menu"></div>');
            $('.esa-mobile-menu').on('click', function () {
                $(_that.cnblogs.navigator).fadeToggle(200);
            });
        }

        /**
         * 构建主题版权信息
         */
        buildCopyright() {
            // please don't delete this function.
            $(this.cnblogs.footer).append('<div>\
            Powered By \
            <a href="https://www.cnblogs.com" target="_blank">Cnblogs</a> | Theme \
            <a href="https://github.com/esofar/cnblogs-theme-silence/releases" target="_blank">Silence ' + this.version + '</a></div>');
        }

        /**
         * 构建博客签名
         */
        buildPostSignature() {
            let config = this.defaluts.signature;
            if (config.enable) {
                let postUrl = $(this.cnblogs.postTitle).attr('href');
                let content = '<div class="esa-post-signature"> \
                                <p>作者：<a href="' + config.home + '">' + config.author + '</a></p> \
                                <p>出处：<a href="' + postUrl + '">' + postUrl + '</a></p> \
                                <p>本站使用「<a href="' + (config.link || '#') + '"  target="_blank">' + config.license + '</a>」创作共享协议，转载请在文章明显位置注明作者及出处。</p> \
                               </div>';
                $(this.cnblogs.mySignature).html(content).show();
            }
        }

        /**
         * 构建评论者头像
         */
        buildPostCommentAvatar() {
            let _that = this;
            var builder = function () {
                $(_that.cnblogs.postCommentBody).before("<div class='esa-comment-avatar'><a target='_blank'><img /></a></div>");
                let feedbackCon = $(_that.cnblogs.feedbackContent);
                for (var i = 0; i < feedbackCon.length; i++) {
                    let avatar = 'https://pic.cnblogs.com/face/sample_face.gif';
                    let span = $(feedbackCon[i]).find("span:last")[0];
                    if (span) {
                        avatar = $(span).html().replace('http://', 'https://');
                    }
                    $(feedbackCon[i]).find(".esa-comment-avatar img").attr("src", avatar);
                    let href = $(feedbackCon[i]).parent().find(".comment_date").next().attr("href");
                    $(feedbackCon[i]).find(".esa-comment-avatar a").attr("href", href);
                }
            }
            if ($(_that.cnblogs.postCommentBody).length) {
                builder();
            } else {
                let count = 1;
                // poll whether the feedbacks is loaded.
                let intervalId = setInterval(function () {
                    if ($(_that.cnblogs.postCommentBody).length) {
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
            let config = this.defaluts.reward;
            if (config.enable) {
                if (!config.wechat && !config.alipay) {
                    throw new Error('Reward module, both `wechat` and `alipay` are null.');
                }

                let content = '<div class="esa-reward"> \
                        <div class="esa-reward-close">+</div> \
                        <h2>"' + (config.title || '') + '"</h2> \
                        <div class="esa-reward-container">';
                if (config.wechat) {
                    content += '<div class="wechat"> \
                                        <img src="' + config.wechat + '" alt="微信支付"> \
                                    </div>'
                }
                if (config.alipay) {
                    content += '<div class="alipay"> \
                                        <img src="' + config.alipay + '" alt="支付宝支付"> \
                                    </div>'
                }
                content += '</div></div>';
                $('body').append(content);

                $('.esa-reward-close').on('click', function () {
                    $(".esa-reward").fadeOut();
                });

                let builder = function () {
                    $('#div_digg').prepend('<div class="reward"><span class="rewardnum" id="reward_count"></span></div>');
                    $('#div_digg .reward').on('click', function () {
                        $(".esa-reward").fadeIn();
                    });
                };

                if ($('#div_digg').length) {
                    builder();
                } else {
                    let intervalId = setInterval(function () {
                        if ($('#div_digg').length) {
                            clearInterval(intervalId);
                            builder();
                        }
                    }, 200);
                }
            } else {
                $('#div_digg').width(300);
            }
        }

        /**
         * 构建收藏按钮
         */
        buildPostFavoriteBtn() {
            let builder = function () {
                $('#div_digg').prepend('<div class="favorite" onclick="AddToWz(cb_entryId);return false;"><span class="favoritenum" id="favorite_count"></span></div>');
            };
            if ($('#div_digg').length) {
                builder();
            } else {
                let intervalId = setInterval(function () {
                    if ($('#div_digg').length) {
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
            let config = this.defaluts.catalog;
            if (config.enable) {
                let levels = [config.level1, config.level2, config.level3];
                let $headers = $(this.cnblogs.postBody).find(levels.join(','));
                if (!$headers.length) {
                    return false;
                }
                let $catalog = $('<div class="esa-catalog"> \
                                    <div class="esa-catalog-tab"><h2>目录</h2></div> \
                                    <div class="esa-catalog-contents"> \
                                        <div class="esa-catalog-title"><h2>目录</h2></div> \
                                        <a class="esa-catalog-close">X</a> \
                                    </div> \
                                </div>');
                let h1c = 0;
                let h2c = 0;
                let h3c = 0;

                let catalogContents = '<ul>';
                $.each($headers, function (index, header) {
                    let tagName = $(header)[0].tagName.toLowerCase();
                    let titleIndex = '';
                    let titleContent = $(header).text();
                    if (!config.index) {
                        switch (tagName) {
                            case config.level1:
                                titleContent = '<span class="level1">' + titleContent + '</span>';
                                break;
                            case config.level2:
                                titleContent = '<span class="level2">' + titleContent + '</span>';
                                break;
                            case config.level3:
                                titleContent = '<span class="level3">' + titleContent + '</span>';
                                break;
                        }
                    } else {
                        if (tagName === config.level1) {
                            h1c++;
                            h2c = 0;
                            h3c = 0;
                            titleIndex = '<span class="level1">' + h1c + '. </span>';
                        } else if (tagName === config.level2) {
                            h2c++;
                            h3c = 0;
                            titleIndex = '<span class="level2">' + h1c + "." + h2c + '. </span>';
                        } else if (tagName === config.level3) {
                            h3c++;
                            titleIndex = '<span class="level3">' + h1c + "." + h2c + "." + h3c + '. </span>'
                        }
                    }
                    catalogContents += '<li class="li_' + tagName + '" title="' + titleContent + '"><i id="esa_index_' + index + '"></i><a class="esa-anchor-link">' + (titleIndex + titleContent) + '</a></li>';
                    $(header).attr('id', 'esa_index_' + index);
                });
                catalogContents += '</ul>';
                $catalog.find('.esa-catalog-contents').append(catalogContents);
                $catalog.appendTo('body');

                let fixedOffsetTop = 70;
                $('.esa-anchor-link').on('click', function () {
                    let href = $(this).prev('i').attr('id');
                    let position = $('#' + href).offset().top - fixedOffsetTop;
                    $('html, body').animate({
                        scrollTop: position
                    }, 300);
                });

                $('.esa-catalog-tab').on('click', function () {
                    $(this).hide();
                    $('.esa-catalog-contents').show();
                });
                $('.esa-catalog-close').on('click', function () {
                    $('.esa-catalog-contents').hide();
                    $('.esa-catalog-tab').show();
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
                    $(document).on('mousemove', function (e) {
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
                    }).on('mouseup', function (_e) {
                        if (move.start) {
                            move.start = false;
                        }
                    });
                }
            }
        }
    }
})(jQuery);