# [Formily](v2.formilyks.org) Vue 版项目脚手架

- 给 Formily 项目预设文件夹
```
formily/
  effects/      # 声明周期函数
    form/
    field/
  schema/       # 协议相关文件存放目录
    json/       # 存放 json-schema
    patches/    # 存放 json-schema 预处理 patches
    scopes/     # 存放 json-schema 中使用的作用域数据
      contents/ # `x-content`
      methods   # 方法，首个参数一般是 field
      states    # 数据
  style/        # 组件样式
  contant.js    # 存放常量
  useFormily.js # 执行后返回 form 实例、schema 实例、和scope
views/
  Formilyg.vue  # Formily 调用组件
```

路由设置：
```js
{
  path: '/:schemaCode/:mode/:dataId?',
  name: 'Formily',
  props: true,
  component: () => import(/* webpackChunkName: 'formily' */'@/views/Formily.vue'),
},
```