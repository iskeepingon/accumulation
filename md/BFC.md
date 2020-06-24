## 前言

这个知识点面试中被问的概率真的不低。

## BFC

块格式化上下文（Block Formatting Context，BFC）是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

## 如何创建BFC

+ 根元素(<html>)
+ 浮动元素（元素的float不是none）
+ 绝对定位元素（元素的position为absolute或fixed）
+ 行内块元素（元素的display为inline-block）
+ 表格单元格（元素的display为table-cell，HTML表格单元格默认为该值）
+ 表格标题（元素的display为table-caption，HTML表格标题默认为该值）
+ 匿名表格单元格元素（元素的display为table、table-row、table-row-group、table-header-group、table-footer-group（分别是HTMLtable、row、tbody、thead、tfoot的默认属性）或inline-table）
+ overflow值不为visible的块元素
+ display值为flow-root的元素
+ contain值为layout、content或paint的元素
+ 弹性元素（display为flex或inline-flex元素的直接子元素）
+ 网格元素（display为grid或inline-grid元素的直接子元素）
+ 多列容器（元素的column-count或column-width不为auto，包括column-count为 1）
+ column-span为all的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

## BFC使用场景

+ 清除浮动
+ 解决margin重合
+ 解决高度塌陷

谢谢阅读！