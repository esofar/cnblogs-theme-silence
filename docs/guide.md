# 部署指南

部署之前请先确认您的博客园账号已正常登陆，并且已联系管理员成功申请开通了 JS 权限。然后进入博客后台「设置」Tab页中完成下列配置。

## 获取文件

使用最新开发版本：
```
https://cdn.jsdelivr.net/gh/esofar/cnblogs-theme-silence/dist/silence.min.css
https://cdn.jsdelivr.net/gh/esofar/cnblogs-theme-silence/dist/silence.min.js
```

使用稳定指定版本：
```
https://cdn.jsdelivr.net/gh/esofar/cnblogs-theme-silence@3.0.0-beta1/dist/silence.min.css
https://cdn.jsdelivr.net/gh/esofar/cnblogs-theme-silence@3.0.0-beta1/dist/silence.min.js
```

注意`3.0.0-beta1`是需要使用的版本号，发行版本请参见 [releases](https://github.com/esofar/cnblogs-theme-silence/releases)，强烈建议使用最新版本。

## 配置 CSS 

在「页面定制 CSS 代码」处，将获取的 CSS 样式文件代码全部粘贴到这里。

> 若 CSS 文件通过`link`标签的方式载入，页面渲染时会有加载延迟的问题，影响用户体验。

## 配置 JS

在「博客侧边栏公告」处，配置用户选项，加载 JS 脚本文件。配置 `window.$silence` 的取值请参见 [配置选项](/options?id=配置选项)。
```
<script>
  window.$silence = {
    // ...
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/esofar/cnblogs-theme-silence@3.0.0-alpha/dist/silence.min.js"></script>
```

## 配置 Loading

为了避免因网络不好等情况导致页面加载卡顿，造成不好的用户体验，给页面添加个 Loading 效果是挺有必要的。

在「页首 HTML 代码」处，从下面选择一种风格的 HTML 代码粘贴到这里。

### 亮色风格

``` light
<div class="light-loading">
  <div class="box">
    <h2>Loading</h2>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    </div>
  </div>
```

### 暗色风格

``` dark
<div class="dark-loading">
  <div class="box">
    <h2>Loading</h2>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    </div>
  </div>
```

## 其他配置

- 「标题」处设置博客标题，注意不支持显示子标题。
- 「博客皮肤」处选择标准模板`Custom`。
- 「禁用模板默认CSS」需要打对勾。