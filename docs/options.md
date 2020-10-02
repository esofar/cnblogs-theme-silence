# 配置选项

下列所有选项均需要配置在「博客侧边栏公告」处的`window.$silence`里。

```js
<script>
  window.$silence = {
    // ...
  };
</script>
```

## avatar

- 类型：`String`
- 默认值：`null`

该配置项用来设置左侧栏中博主头像图片，未配置则不会渲染。

注意图片需自行上传至支持外链的存储空间，建议使用图片像素大小为`230px*230px`，图片过大可能会影响页面加载速度。

```js
window.$silence = {
  avatar: 'https://images.cnblogs.com/cnblogs_com/esofar/972540/o_avatar.jpg'
};
```

## favicon

- 类型：`String`
- 默认值：`null`

该配置项用来设置网页标题前面的小图标，未设置则继续使用博客园官方默认的图标。

注意图标类型是`ico`格式，其他类型可以通过 [Aconvert](https://www.aconvert.com/image/) 在线转换后上传和使用。

```js
window.$silence = {
  favicon: 'https://blog-static.cnblogs.com/files/esofar/favicon.ico'
};
```

## github

- 类型：`String`
- 默认值：`null`

该配置项用来设置个人 Github 主页地址，会在页面左上角渲染一个 [GitHub Corner](https://github.com/tholman/github-corners) 挂件，未设置则不会渲染。

```js
window.$silence = {
  github: 'https://github.com/esofar'
};
```

## defaultMode

- 类型：`String`
- 默认值：`'auto'`

该配置项用来设置默认加载的主题模式。可选值如下：

- `'light'`：日间模式
- `'dark'`：夜间模式
- `'auto'`：自动模式

自动模式会根据当前时间自行选择日间或夜间模式：早上 6 点至晚上 6 点前加载日间模式，晚上 6 点至次日早上 6 点前加载夜间模式。

```js
window.$silence = {
  defaultMode: 'auto'
};
```

## defaultTheme

- 类型：`String`
- 默认值：`'a'`

该配置项用来设置默认加载的主题色彩。可选值与色彩对照表如下：

<table>
    <tr>
        <td><code>'a'</code></td>
        <td><div style="background: #2d8cf0;height: 25px;width: 25px;border-radius: 4px;"></div></td>
        <td><code>'b'</code></td>
        <td><div style="background: #fa7298;height: 25px;width: 25px;border-radius: 4px;"></div></td>
        <td><code>'c'</code></td>
        <td><div style="background: #42b983;height: 25px;width: 25px;border-radius: 4px;"></div></td>
        <td><code>'d'</code></td>
        <td><div style="background: #607d8b;height: 25px;width: 25px;border-radius: 4px;"></div></td>
        <td><code>'e'</code></td>
        <td><div style="background: #5e72e4;height: 25px;width: 25px;border-radius: 4px;"></div></td>
    </tr>
     <tr>
        <td><code>'f'</code></td>
        <td><div style="background: #ff9700;height: 25px;width: 25px;border-radius: 4px;"></div></td>
        <td><code>'g'</code></td>
        <td><div style="background: #ff5722;height: 25px;width: 25px;border-radius: 4px;"></div></td>
        <td><code>'h'</code></td>
        <td><div style="background: #009688;height: 25px;width: 25px;border-radius: 4px;"></div></td>
        <td><code>'i'</code></td>
        <td><div style="background: #673bb7;height: 25px;width: 25px;border-radius: 4px;"></div></td>
        <td><code>'j'</code></td>
        <td><div style="background: #906f61;height: 25px;width: 25px;border-radius: 4px;"></div></td>
    </tr>
</table>

```js
window.$silence = {
    defaultTheme: 'a'
};
```

## navbars

- 类型：`Arrary`
- 默认值：`[]`

该配置项用来在导航栏中追加自定义菜单项。

注意目前仅支持到二级菜单，一级菜单项通过`chilren`属性配置纵向悬浮二级菜单。若希望链接页面总是在一个新打开的窗口中载入，则需要在菜单项中多配置一个值为`'_blank'`的`target`属性。

```js
window.$silence = {
    navbars: [{
        title: '标签',
        url: 'https://www.cnblogs.com/esofar/tag/'
    }, {
        title: '朋友',
        chilren: [{
            title: '百度',
            target: '_blank',
            url: 'https://www.baidu.com',
        }, {
            title: '谷歌',
            target: '_blank',
            url: 'https://www.google.com',
        }]
    }]
};
```

## showNavAdmin

- 类型：`Boolean`
- 默认值：`true`

该配置项用来控制是否显示导航栏中的「管理」菜单项。

博客园官方的原生导航栏菜单项中除「管理」以外，其余均可在后台控制显示或者隐藏。对于希望完全自主设置导航栏菜单项的园友来说，可能会有隐藏「管理」菜单项的需求。

```js
window.$silence = {
    showNavAdmin: false
};
```

## catalog

- 类型：`Object`
- 默认值：`{}`

该配置项用来生成在右侧悬浮的博文标题目录。

标题目录悬浮可有效帮助读者实时分析文体结构、加深阅读印象，对一些长文来讲，效果尤佳。另外，该模块不会破坏 markdown 格式博文中使用`[TOC]`标记生成的目录标题锚点，两类标题目录可同时使用。

``` js
window.$silence = {
    catalog: {
        enable: true,
        index: true,
        active: false,
        levels: ['h2', 'h3', 'h4']
    },
};
```

其属性详细介绍参考如下：

### enable

- 类型：`Boolean`
- 默认值：`false`

是否启用目录生成功能。

若在博文中未使用标题`h1~h6`，即使启用也不会生成悬浮目录。

### index

- 类型：`Boolean`
- 默认值：`true`

是否在生成的标题链接前面添加索引。

部分园友习惯在写文时直接在标题前面加上索引，这种情况可能需要将该属性值设为`false`，不然生成的标题链接会出现索引重复的情况。

### active

- 类型：`Boolean`
- 默认值：`false`

页面加载时是否直接显示目录。

不直接显示情况下会在页面右下角的工具栏中生成一个按钮用来控制悬浮目录的显示和隐藏。

### levels

- 类型：`Arrary`
- 默认值：`['h2', 'h3', 'h4']`

设置需要生成目录的标题等级。

请根据自己平时的标题等级使用规则自行修改默认值，注意仅支持采集三级博文标题。


## signature

- 类型：`Object`
- 默认值：`{}`

该配置项用来在每篇博文结尾处生成版权签名。

``` js
window.$silence = {
    signature: {
        enable: true,
        author: null,
        license: ['署名-非商业性使用-相同方式共享 4.0 国际', 'https://creativecommons.org/licenses/by-nc-sa/4.0/'],
        remark: '你可以在这里自定义其他内容',
    }
};
```

其属性详细介绍参考如下：

### enable

- 类型：`Boolean`
- 默认值：`false`

是否启用签名生成功能。

### author

- 类型：`String`
- 默认值：`null`

自定义作者名称，未设置则默认使用博客园显示名称。


### license

- 类型：`Arrary`
- 默认值：`['署名-非商业性使用-相同方式共享 4.0 国际', 'https://creativecommons.org/licenses/by-nc-sa/4.0/']`

设置您分享的作品需要采用的 [知识共享许可协议](https://creativecommons.org/licenses/)。


### remark

- 类型：`String`
- 默认值：`null`

设置其他备注，未设置则不会渲染，支持 HTML 内容。


## sponsor

- 类型：`Object`
- 默认值：`{}`

该配置项用来在每篇博文结尾处生成赞赏按钮。

``` js
window.$silence = {
    sponsor: {
        enable: true,
        text: '',
        paypal: 'https://images.cnblogs.com/cnblogs_com/esofar/972540/o_wechat.png',
        wechat: 'https://images.cnblogs.com/cnblogs_com/esofar/972540/o_wechat.png',
        alipay: 'https://images.cnblogs.com/cnblogs_com/esofar/972540/o_alipay.png'
    }
};
```

其属性详细介绍参考如下：

### enable

- 类型：`Boolean`
- 默认值：`false`

是否启用赞赏按钮生成功能。


### text

- 类型：`String`
- 默认值：`'Buy me a cup of coffee ☕.'`

设置赞赏友好提示。

### paypal

- 类型：`String`
- 默认值：`null`

设置 PayPal 收款二维码。

### wechat

- 类型：`String`
- 默认值：`null`

设置微信收款二维码。

### alipay

- 类型：`String`
- 默认值：`null`

设置支付宝收款二维码。
