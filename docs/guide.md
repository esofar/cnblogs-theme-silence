# ☕ 部署指南

请先确认你的博客园账号是否成功开通了 JS 权限，如未开通请邮件联系管理员申请。

JS权限开通后进入博客后台「设置」页中完成如下步骤配置。

## Step1：获取文件

主题必要的 CSS 和 JS 文件可以在 [已发行版本](https://github.com/esofar/cnblogs-theme-silence/releases) 的资源压缩包中获取，[点击](https://github.com/esofar/cnblogs-theme-silence/archive/refs/tags/v3.0.0-rc2.zip)下载最新版本(v3.0.0-rc2)。
```
└─dist
  └─silence.min.css
  └─silence.min.js
```

另外，也可以借助开源 CDN [jsDelivr](https://www.jsdelivr.com/)，以外链的方式直接获取。
 
```
https://fastly.jsdelivr.net/gh/esofar/cnblogs-theme-silence@3.0.0-rc2/dist/silence.min.css
https://fastly.jsdelivr.net/gh/esofar/cnblogs-theme-silence@3.0.0-rc2/dist/silence.min.js
```

## Step2：配置 CSS 

将 Step1 获取的 CSS 文件使用文本编辑器或浏览器打开，然后将全部内容复制粘贴到「页面定制 CSS 代码」处。

注意「禁用模板默认CSS」需要勾选。

![配置 CSS](_media/cfg-css.png)

## Step3：配置 JS

将 Step1 获取的 JS 文件托管到博客园后台获取外链（也可以直接使用 jsDelivr 提供的访问地址），然后使用`<script>`标签引用。

接下来，放在「页脚 HTML 代码」处加载，`window.$silence` 用来配置用户选项，详请参见 [配置选项](/options?id=配置选项)。

![配置 JS](_media/cfg-js.png)


<details>
  <summary>样例配置</summary>
  <pre>

&lt;script&gt;
  window.$silence = {
    avatar: 'http://images.cnblogs.com/cnblogs_com/esofar/972540/o_avatar.jpg',
    favicon: 'https://files.cnblogs.com/files/esofar/favicon.ico',
    github: 'https://github.com/esofar',
    defaultTheme: 'e',
    navbars: [{
      title: '标签',
      url: 'https://www.cnblogs.com/esofar/tag/'
    }, {
      title: '归档',
      url: 'https://www.cnblogs.com/esofar/p/'
    }, {
      title: '开源',
      chilren: [{
        title: 'Silence',
        target: '_blank',
        url: 'https://github.com/esofar/cnblogs-theme-silence/',
      }, {
        title: 'Dddify',
        target: '_blank',
        url: 'https://github.com/esofar/dddify/',
      }]
    }],
    catalog: {
      enable: true,
      index: true,
      active: false,
      levels: ['h2', 'h3', 'h4'],
    },
    signature: {
      enable: true,
      author: 'Esofar',
      license: ['署名-非商业性使用-相同方式共享 4.0 国际', 'https://creativecommons.org/licenses/by-nc-sa/4.0/'],
    },
    sponsor: {
      enable: true,
      wechat: 'https://images.cnblogs.com/cnblogs_com/esofar/972540/o_wechat.png',
      alipay: 'https://images.cnblogs.com/cnblogs_com/esofar/972540/o_alipay.png'
    }
  };
&lt;/script&gt;
&lt;script src="https://fastly.jsdelivr.net/gh/esofar/cnblogs-theme-silence@3.0.0-rc2/dist/silence.min.js"&gt;&lt;/script&gt;

</pre>
</details>


## Step4：配置 Loading

将如下代码粘贴到「页首 HTML 代码」处。

```
<div class="loading">
  <div class="box">
    <h2>Loading</h2>
    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
  </div>
</div>
```

![](_media/cfg-tpl.png)


## Step5：其他配置

1. 「基本设置」栏中，「博客标题」处设置博客名称，默认不支持显示「博客子标题」，「博客皮肤」处需要选择标准模板`Custom`。

![](_media/cfg-title.png)

2. 「代码高亮」栏中，「渲染引擎」选择`highlight.js`，「显示行号」不要勾选，「主题样式」选择`cnblogs`。

![](_media/cfg-skin.png)
