# 部署文档

> 操作之前请先确保您的博客园账号已正常登陆并且已经成功申请开通了 JS 权限。

## 主题下载

点击 [下载](https://github.com/esofar/cnblogs-theme-silence/archive/master.zip)  本主题最新版本源码包，下载完毕后，使用解压工具解压并进入解压后目录，其结构大致如下所示：

```
│  .babelrc                                                   
│  .gitignore                                                 
│  LICENSE                                                    
│  package-lock.json                                          
│  package.json                                               
│  README.md                                                  
│                                                             
├─dist                           // 编译发布目录                                      
│  │  silence.min.js                                          
│  │                                                          
│  └─themes                                                   
│          dark.min.css                                       
│          default.min.css                                    
│          goddess.min.css                                    
│                                                             
├─docs                           // 文档相关目录                                       
│      change.md                                              
│      logo.png                                               
│      theme_dark.png                                         
│      theme_default.png                                      
│      theme_goddess.png                                      
└─src                            // 源码存放目录                               
    │  silence.js                                             
    │  silence.less                                           
    │                                                         
    ├─images                                                  
    │      contents.png                                         
    │      follow.png                                   
    │      gotop.png                                            
    │                                                         
    └─themes                                                  
            dark.less                                         
            default.less                                      
            goddess.less                                      
                                                              
```

然后打开博客园后台 [管理](https://i.cnblogs.com/) 页面，进行后续操作。

## 使用样式

打开`./dist/themes`文件夹，选择一款自己心仪的主题风格代码文件。

```
default.min.css         // 简约 · 蓝
dark.min.css            // 暗黑 · 绿
goddess.min.css         // 女神 · 粉
```

使用 Notepad++ 等文本编辑工具打开您选择的主题样式文件，全选所有代码，然后复制。

进入『[设置](https://i.cnblogs.com/Configure.aspx)』界面，将复制的代码粘贴到「页面定制CSS代码」文本域中。

点击「保存」按钮，保存上述操作。

## 上传脚本

打开`./dist`文件夹，获取主题的 JS 脚本文件`silence.min.js`。

进入『[文件](https://i.cnblogs.com/Files.aspx)』界面，将该文件上传到自己的博客中。上传完成后，点击文件名便可在浏览器地址栏中获取上传文件的外链，类似如下所示：
```
https://blog-static.cnblogs.com/files/esofar/silence.min.js
```

然后使用`<script>`标签将外链包裹，生成一个网页脚本引用，类似如下所示：

```
<script src="https://blog-static.cnblogs.com/files/esofar/silence.min.js"></script>
```

进入『[设置](https://i.cnblogs.com/Configure.aspx)』界面，将上面生成的网页脚本引用复制到「博客侧边栏公告」文本域中。

> 说明：主题脚本文件`silence.min.js`非必须上传到博客园，也可上传到七牛云等对象存储空间，但必须开启 HTTPS 访问。

## 使用脚本

为了提高园友的阅读体验，主题在博客园原有功能基础上追加了一些辅助阅读、以及人性化的功能模块。其中部分模块做了参数配置，用户可根据自己意愿选择是否启用。若启用，再根据自己的信息或写作习惯设置相关参数。

进入『[设置](https://i.cnblogs.com/Configure.aspx)』界面，将如下脚本代码引用 **追加** 到「博客侧边栏公告」文本域中，其中配置参数根据下表自行修改。

```
<script type="text/javascript">
    $.silence({
        avatar: 'http://images.cnblogs.com/cnblogs_com/esofar/972540/o_avatar.jpg',
        favicon: 'https://files.cnblogs.com/files/esofar/favicon.ico',
        navigation: [
            {
                title: '标签',
                url: 'https://www.cnblogs.com/esofar/tag/'
            },
            {
                title: '归档',
                url: 'https://www.cnblogs.com/esofar/p/'
            },
            {
                title: '导航',
                chilren: [
                    {
                        title: '谷歌',
                        url: 'https://www.google.com/',
                    },
                    {
                        title: '百度',
                        url: 'https://www.baidu.com/',
                    },
                ]
            },
        ],
        catalog: {
            enable: true,
            move: true,
            index: true,
            level1: 'h2',
            level2: 'h3',
            level3: 'h4',
        },
        signature: {
            enable: true,
            license: '署名-非商业性使用-相同方式共享 4.0 国际',
            link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
            remark: null
        },
        sponsor: {
            enable: true,
            paypal: null,
            wechat: 'https://images.cnblogs.com/cnblogs_com/esofar/972540/o_wechat.png',
            alipay: 'https://images.cnblogs.com/cnblogs_com/esofar/972540/o_alipay.png'
        },
        github: {
            enable: true,
            link: 'https://github.com/esofar'
        }
    });
</script>
```

配置参数说明表：
<table>
    <thead>
        <tr>
            <td align="center">模块</td>
            <td>属性</td>
            <td>说明</td>
            <td>类型</td>
            <td>默认值</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="3" align="center">公共模块</td>
            <td>avatar</td>
            <td>博主头像</td>
            <td>String</td>
            <td>null</td>
        </tr>
        <tr>
            <td>favicon</td>
            <td>网页标题图标</td>
            <td>String</td>
            <td>null</td>
        </tr>
        <tr>
            <td>navigation</td>
            <td>自定义导航</td>
            <td>Array</td>
            <td>null</td>
        </tr>
        <tr>
            <td rowspan="6" align="center">catalog（博文目录）</td>
            <td>enable</td>
            <td>是否启用</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>move</td>
            <td>是否允许拖拽</td>
            <td>Boolean</td>
            <td>true</td>
        </tr>
        <tr>
            <td>index</td>
            <td>是否显示索引</td>
            <td>Boolean</td>
            <td>true</td>
        </tr>
        <tr>
            <td>level1</td>
            <td>一级标题</td>
            <td>String</td>
            <td>h2</td>
        </tr>
        <tr>
            <td>level2</td>
            <td>二级标题</td>
            <td>String</td>
            <td>h3</td>
        </tr>
        <tr>
            <td>level3</td>
            <td>三级标题</td>
            <td>String</td>
            <td>h4</td>
        </tr>
        <tr>
            <td rowspan="5" align="center">signature（博文签名）</td>
            <td>enable</td>
            <td>是否启用</td>
            <td>Boolean</td>
            <td>true</td>
        </tr>
        <tr>
            <td>auther</td>
            <td>作者名字</td>
            <td>String</td>
            <td>[Cnblogs Nickname]</td>
        </tr>
        <tr>
            <td>license</td>
            <td>共享许可协议名称</td>
            <td>String</td>
            <td>署名-非商业性使用-相同方式共享 4.0 国际</td>
        </tr>
        <tr>
            <td>link</td>
            <td>共享许可协议链接</td>
            <td>String</td>
            <td>https://creativecommons.org/licenses/by-nc-sa/4.0/</td>
        </tr>
        <tr>
            <td>remark</td>
            <td>其他备注</td>
            <td>String</td>
            <td>null</td>
        </tr>
        <tr>
            <td rowspan="5" align="center">sponsor（博文赞赏）</td>
            <td>enable</td>
            <td>是否启用</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>text</td>
            <td>标题</td>
            <td>String</td>
            <td>Sponsor</td>
        </tr>
        <tr>
            <td>paypal</td>
            <td>PayPal 收款地址</td>
            <td>String</td>
            <td>null</td>
        </tr>
         <tr>
            <td>alipay</td>
            <td>支付宝收款二维码</td>
            <td>String</td>
            <td>null</td>
        </tr>
        <tr>
            <td>wechat</td>
            <td>微信收款二维码</td>
            <td>String</td>
            <td>null</td>
        </tr>
        <tr>
            <td rowspan="4" align="center">github（GitHub Corners）</td>
            <td>enable</td>
            <td>是否启用</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>fill</td>
            <td>背景填充色</td>
            <td>String</td>
            <td>[Silence Theme Color]</td>
        </tr>
        <tr>
            <td>color</td>
            <td>章鱼猫颜色</td>
            <td>String</td>
            <td>#fff</td>
        </tr>
        <tr>
            <td>link</td>
            <td>Github 链接</td>
            <td>String</td>
            <td>null</td>
        </tr>
    </tbody>
</table>

配置完成后，记得点击「保存」按钮，保存上述操作。

## 其他配置

进入『[设置](https://i.cnblogs.com/Configure.aspx)』界面，在「标题」文本框中设置博客标题，注意不支持显示「子标题」；在「博客皮肤」处选择博客园官方标准模板 **Custom**；把「禁用模板默认CSS」复选框取消勾选。最后，点击「保存」按钮保存上述 3 步操作。

进入『[选项](https://i.cnblogs.com/Preferences.aspx)』界面，在「控件显示设置」中需要勾选的博客园官方功能模块如下几个：

- 必须要勾选：公告、我的标签、随笔分类、阅读排行榜、推荐排行榜
- 自定义勾选：博客园链接、首页链接、RSS订阅、联系

其他模块取消勾选(可选操作)。最后，点击「SAVE」按钮保存操作。

> 至此，主题部署完成。

## 写在最后

熟悉博客园的朋友都清楚，博客园提供了多种编辑器供我们选择，不同编辑器模式下发表的博文样式可能有所差别，本主题可能无法全面测试覆盖重写，所以本主题肯定会存在一些不足之处，如果您在使用遇到问题欢迎提交 Issues，我会及时响应。

不过本主题对 Markdown 编辑模式下的博文样式支持相对较好，所以斗胆推荐您使用 Markdown 编辑器编辑发表新的博文，具体设置如下：

进入『[选项](https://i.cnblogs.com/Preferences.aspx)』界面，在「默认编辑器」中选择 Markdown 选项，然后点击「SAVE」按钮保存操作。

> 如果您还不知道什么是 [Markdown](https://en.wikipedia.org/wiki/Markdown) ，是不是有点跟不上队伍了。

如果您在部署遇到任何问题请给我发邮件 esofar@qq.com。
