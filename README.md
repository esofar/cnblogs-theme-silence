<div align="center">

<img src="./docs/logo.png" height="150" />

# Silence

[![Cnblogs](https://img.shields.io/badge/latest-v2.0.2-brightgreen.svg)](https://github.com/esofar/cnblogs-theme-silence/releases)
[![Cnblogs](https://img.shields.io/badge/dependencies-jQuery-blue.svg)](https://www.cnblogs.com)
[![GitHub issues](https://img.shields.io/github/issues/esofar/cnblogs-theme-silence.svg)](https://github.com/esofar/cnblogs-theme-silence/issues)
[![GitHub license](https://img.shields.io/github/license/esofar/cnblogs-theme-silence.svg)](https://github.com/esofar/cnblogs-theme-silence/blob/master/LICENSE)

</div>

## 介绍

一款专注阅读的博客园主题，主要面向于经常混迹 [博客园](https://www.cnblogs.com/) 的朋友。其追求大道至简的终极真理，界面追求简洁、运行追求高效、部署追求简单。

- [部署文档](./docs/deploy.md)
- [更新日志](./docs/change.md)

## 特性

* :blue_heart: 简洁优雅、精致漂亮的 UI 设计。
* :purple_heart: 提供多种风格主题以便适应各类用户的偏好。
* :heart: 响应式设计，兼容手机端浏览器。
* :green_heart: 提供事无巨细的部署文档。
* :yellow_heart: 源码结构清晰并且注释完整，方便扩展。

## 风格

<div align="center">

简约 · 蓝

![](./docs/theme_default.png)

暗黑 · 绿

![](./docs/theme_dark.png)

女神 · 粉

![](./docs/theme_goddess.png)

</div> 

## 开发

> 请先确保您正在使用的机器已经安装 [Node.js](https://nodejs.org) 和 [Git](https://git-scm.com) 客户端。

```
git clone https://github.com/esofar/cnblogs-theme-silence.git   # 克隆源码
cd cnblogs-theme-silence                                        # 进入项目
npm install                                                     # 安装依赖
npm run build                                                   # 重新构建
```

### 自定义功能

如果您想要新增一些个性化的交互功能模块，那么您应该先修改项目`./src/silence.js`脚本文件。您需要在该文件中为将要新增的功能模块添加一些新的方法，然后在入口方法`init()`中的适当位置去调用它们。

该文件代码结构清晰、注释完整，若您具备一定的 Javascript 开发经验，应该可以很容易看明白，这里就不再过多赘述。

如果您想要自定义某些元素的样式或者是新增交互功能模块需要添加新的样式，那么您应该修改项目`./src/themes/*.less`样式文件，`*.less`取决于您选择应用的主题风格，您需要在该文件中编写自定义的样式。在修改之前，建议您先了解 [Less](http://lesscss.org/) 的基础用法。

若您想要将自定义的样式应用到所有主题风格，建议您直接修改项目`./src/silence.less`公共样式文件，不过在编写样式代码的时候需要考虑各个主题风格的兼容性。

完成您想做的一切后，在终端中执行`npm run build`命令重新构建项目，该命令会编译、压缩所有风格的样式文件`./src/themes/*.less`和脚本文件`./src/silence.js`，并将结果输出至项目`./dist`发布目录。

最后，参考「[部署文档](./docs/deploy.md)」重新安装主题即可。

### 新增主题风格

如果您不满意官方提供主题风格，那么您可以参考本节内容新增一个自己的主题风格。

首先进入项目`./src/themes`目录，新建一个新的主题风格样式文件，例如：`example.less`，然后在该文件中编写样式代码即可。其代码结构、编写规则请参考 [goddess.less](./src/themes/goddess.less) 文件。

样式代码编写完成后，需要在项目工程中配置该文件的编译命令，具体做法如下。

打开项目`package.json`文件，找到`scripts`节点，新增一个命令`theme-example`，用来编译样式文件`example.less`：

```
"theme-example": "lessc ./src/themes/example.less ./dist/themes/example.min.css -clean-css",
```
然后，在`build`构建命令中追加上述样式文件编译命令`theme-example`：
```
... & npm run theme-goddess
```

最后，在终端中执行`npm run build`命令重新构建项目，新增的主题风格`example`便会被输出至项目`./dist`发布目录。