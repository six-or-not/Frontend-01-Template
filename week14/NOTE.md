html parser vueJS 的 SFC jsx 都可以用来实现我们的组件化

安装jsx环境
npm init -y
yarn add -D webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/plugin-transform-react-jsx
使用 jsx 创建的组件树，实例化时是先实例化子组件，然后再实例化父组件，因为 jsx 语法会变编译为函数调用，而子组件都是作为额外的参数传递给父组件的， 比如下面这样的一个jsx表达式：

let component = <MyComponent title="hello" data={1234}>

    <div class="abc">test</div>
    <span>test2</span>

</MyComponent>
会被编译为下面的函数调用：

var component = createElement(MyComponent, {

    title: 'hello',
    data: 1234

}, createElement("div", {class: "abc"}, "text"), 
createElement("span", null, "text2"))
而调用一个函数的时候，会先对该函数的参数进行求值，所以就导致 createElement("div") 和 createElement("span") 会先于 createElement(MyComponent) 调用，因此也就导致子组件先进行实例化。
