# weather_app

- [项目描述](##项目描述)
- [项目要点](##项目要点)
- [项目难点](##项目难点)
- [额外功能](##额外功能)
- [项目预览](##项目预览)

## 项目描述

本项目是一个天气预报移动APP，使用vue+webpack构建的单页面应用，采用组件化思想搭建整个项目，从而使组件高度复用，代码简洁。

## 项目要点

-  使用vue框架，以及vue-router构建单页面应用。
- 基于webpack来搭建项目工程，配置第三方插件。
- 合理使用钩子函数，实现数据的监听、渲染页面、页面节点的实例化功能。
- 使用百度ECharts图表库绘制温度曲线。
- 实现省市二级联动切换城市。



## 项目难点

- html的select选择标签样式不够美观，并且难以利用css更改样式

  解决方案：自己使用ul、li标签创建一个二级联动选择器组件，并使用$emit方法向父组件传递数据

- 页面EChcarts图表加载往往先于数据获取，导致图表无数据，无法显示

  解决方案：在包含图表的div标签中用v-if判断是否获取到数据，等获取到数据后再加载图表。

 



## 额外功能

本APP添加了**`当年今日`**历史回看以及**`快递查询`**功能



## 项目预览

![](F:\wamp64\www\H5\program\weather_app\static\home.png)

![](F:\wamp64\www\H5\program\weather_app\static\home2.png)

![](F:\wamp64\www\H5\program\weather_app\static\history.png)

![](F:\wamp64\www\H5\program\weather_app\static\express.png)