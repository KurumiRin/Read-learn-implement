### 分析一下目录

- 什么类型的文件放到什么文件夹内
- 一般都会有几个文件夹

### .editorconfig 是干嘛的

### .gitattributes 是干嘛的

### 持续集成是如何实现的

- circle.yml 是如何配置的

### 分析一下单元测试环境是如何搭建的

- ts-jest 是解决什么问题的
  - 如果没有 ts-jest 的话 你会搭建基于 ts 的 jest 的环境嘛？
    - 写个 demo？
- 分析一下 jest.config.js 这几个字段都有什么用？

### 分析一下 package.json 里面的字段都是干嘛的

- 发布一个库需要用到哪些字段

### 写一个库的 README 需要哪几个部分？

- 结构是什么样子的？
- 有哪些可以快速生成 readme 的库
  - 可以记录下来，下次一起分析是如何做到的

### 构建是如何做的？

- 分析 rollup.config.js

### 分析一下 tsconfig 里面的配置项

### 画一下这个库的程序流程图

- 画流程图可以参考这篇文章 [https://zhuanlan.zhihu.com/p/364507517](https://zhuanlan.zhihu.com/p/364507517)
- 画好了图之后可以更清晰明了的看到程序设计的全貌
- 划分好类的职责
  - CAC
  - Command
  - Option
- 可以画一下 UML 图

### 尝试通过单元测试调试库

- 可以把你通过单元测试调试库的过程记录下来
- 让别人可以基于你的记录也可以实现

### 这个库应该如何使用？

- 基于这个库的文档写一篇小教程
- 让别人基于你的教程就可以使用这个库

### 如何理解 option

- 概念
- 在程序里面是如何实现的

### 如何理解 command

- 概念
- 在程序里面是如何实现的

### 如何理解 action

- 概念
- 在程序里面是如何实现的

### 如何实现连续调用的 api

```ts
cli
  .command("dev", "Start dev server")
  .option("--clear-screen", "Clear screen")
  .action((options) => {
    console.log(options.clearScreen);
  });
```

### Brackets 应该如何使用

- 方括号和尖括号有什么不同

### Brackets 是如何实现的

### Negated Options 是如何实现的？

### 分析一下下面这段代码的执行流程

```ts
const cli = require("cac")();
cli
  .command("build", "desc")
  .option("--env <env>", "Set envs")
  .example("--env.API_SECRET xxx")
  .action((options) => {
    console.log(options);
  });

cli.help();
```

### 还可以从功能上分解需求点

- 全局的 command 是如何实现的
- sub command 是如何实现的
- 每个 command 的 option 是如何实现的
- help 和 version 是如何实现的

### 程序等于数据结构＋算法

- 哪一部分是收集数据的
  - 对应初始化的逻辑
- 哪一部分是算法
