# 项目文档
## 1. 项目概述
本项目是一个基于 Vue.js、tailwindcss 和 element-ui-plus 的计算机模型演示网站。它使用了 axios 进行跨站交互，使用了 monaco-editor、fullpage.js 和 GSAP 等工具进行页面制作，使用了 Vite 进行项目构建。

## 2. 主要功能

2.1 二进制原理展示

在这部分，用户可以看到二进制数据和代码的原理，包括整数（补码）和浮点数的原理，以及指令集设计原理。

2.2 计算机模型展示

在这部分，用户可以看到以内存为中心的程序员视角的计算机模型，包括计算机加电开机的过程模型，计算机内存编址和分段（Segment），以及处理器计算和 I/O 的过程。

2.3 代码执行流程展示

在这部分，用户可以看到基于 "JUMP" 的代码执行 "顺序、分支、循环" 的三个基本流程。

2.4 编译过程展示

在这部分，用户可以看到从高级语言到二进制代码的编译过程，以及具有运行时环境（如 JRE）的代码运行过程。

2.5 RISC-V指令集设计原理

在这部分，用户可以看到RISC-V指令集的设计理念以及指令集与二进制之间的对应关系

## 3. 技术栈
本项目使用了以下技术：

- Vue.js：用于构建用户界面的 JavaScript 框架。
- tailwindcss：一个用于构建响应式设计的 CSS 框架。
- element-ui-plus：一套为开发者、设计师和产品经理准备的基于 Vue 3.x 的组件库。
- axios：用于进行 HTTP 请求的 JavaScript 库。
- monaco-editor：微软出品的代码编辑器，用于在网页上展示和编辑代码。
- fullPage.js：用于创建全屏滚动网站的 JavaScript 库。
- GSAP：一个强大的 JavaScript 动画库。
- Vite：一个由 Vue.js 作者开发的构建工具，用于快速开发 Vue.js 应用。
4. 如何运行
首先，你需要安装 Node.js 和 npm。然后，你可以使用以下命令来运行本项目：
~~~
npm install
#安装依赖

npm run dev
#在 localhost:5173 上启动开发服务器
~~~

5. 如何贡献
如果你想为本项目做出贡献，你可以通过 GitHub 提交 Pull Request。我们欢迎任何形式的贡献！

6. 许可证
本项目采用 MIT 许可证。你可以在项目的 LICENSE 文件中查看完整的许可证文本。

7. 联系方式
如果你有任何问题或建议，你可以通过以下方式联系我们：

邮箱：202322460126@mail.sdu.edu.cn
GitHub：https://github.com/Dregen-Yor/vue-homework-project

---

### 参考资料

[rcore](https://rcore-os.cn/rCore-Tutorial-Book-v3/)

[element-plus](https://element-plus.org/zh-CN/)

[monaco-vue](https://github.com/imguolao/monaco-vue/)

[tailwindcss](https://tailwind.nodejs.cn/docs)

[gsap实战](https://xieyufei.com/2023/04/14/GSAP-Practise.html)

[fullpage.js](https://github.com/alvarotrigo/fullPage.js)