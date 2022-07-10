[English](./usage_en.md) | [中文](./usage_cn.md)

> npx tsx ./cac/index.ts

执行上面命令后会得到以下输出

> { args: [], options: { '--': [], type: 'index.ts' } }

查看 Demo [demo](./demo.ts).

### 显示帮助信息和版本

```ts
cli.option("--name <name>", "Provide your name");
// 通过 -h 和 --help 来显示帮助信息，这会展示所有的指令，如这里设定了 name
cli.help();
// 通过 -v 或 --version 展示版本信息，版本信息同样会在 help message 中出现
cli.version("0.0.0");
// 必须执行这一条
cli.parse();
```

### 特定于指令的选项

```ts
cli
  .command("rm <dir>", "Remove a dir")
  .option("-r, --recursive", "Remove recursively")
  .action((dir, options) => {
    console.log(`remove ${dir}${options.recursive ? " recursively" : ""}`);
  });
cli.help();
cli.parse();
```

可以使用 `npx tsx index.ts rm foo -r` 来看看效果

所以可以通过链式调用来为某个 `command` 指定特定的选项

### 选项名称中的短划线以及如何获取选项

如果在 action 中需要引用选项的名称，应该使用 `camelCase` 来引用 `kebab-case` 的选项

```ts
cli
  .command("dev", "start dev server")
  .option("--clear-screen", "clear command screen")
  .action((options) => {
    // camelCase 引用 kebab-case 的选项
    console.log(options.clearScreen);
  });
cli.parse();
```

### 括号

在 command 名称中，cac 支持 `[]` 方括号和 `<>` 尖括号两种形式：

在命令名中：

- **[]**：表示可选值
- **<>**：表示必须值

在选项值中：

- **<>**：string 或者 number
- **[]**：true

```ts
cli
  .command("deploy <folder>", "Deploy a folder to AWS")
  .option("--scale [level]", "Scaling level")
  .action((folder, options) => {
    // ...
  });

cli
  .command("build [project]", "Build a project")
  .option("--out <dir>", "Output directory")
  .action((folder, options) => {
    // ...
  });

cli.parse();
```

### 否定值

为了支持否定值，需要手动指定否定选项

```ts
// 注意，如果存在 --config，那么否定值必须是 no-xxx
cli
  .command("dev <project>", "Start DevServer")
  .option("--no-config", "disabled config")
  .option("--config <path>", "Use a custom path")
  .action((project, options) => {
    console.log({ project, options });
  });
```

### 可变参数

命令的最后一个参数可以是可变的，而且必须只能是最后一个参数，如果需要使用可变参数，就需要在参数名称的开头加上`...`

```ts
cli
  .command("dev <project> [...otherFiles]", "Start DevServer")
  .action((project, otherFiles, options) => {
    console.log({ project, otherFiles, options });
  });

cli
  .command("build <entry> [...otherFiles]", "Build your app")
  .option("--foo", "Foo option")
  .action((entry, otherFiles, options) => {
    console.log(entry);
    console.log(otherFiles);
    console.log(options);
  });
```

输入 `dev d g f`

`project` 是 `d`，`otherFiles` 是 `[g, f]`

输入 `build a.js b.js c.js`

`entry` 是 `a.js` 、 `otherFiles` 是 `b.js c.js`

### 点嵌套选项(对象形式的指令)

cac 可以点嵌套选项也就是接收对象形式的指令，将合并为一个选项。最终表现形式是 `.` 组合，

```ts
// build --env.foo foo --env.bar bar
// console this: { '--': [], env: { foo: 'foo', bar: 'bar' } }
cli
  .command("build", "desc")
  .option("--env <env>", "set env")
  .action((options) => {
    console.log({ options });
  });
```

### 默认命令

注册一个指令，如果没有匹配到其他指令，那么这个指令就会作为默认指令被触发

```ts
// a b c --mini
// { files: [ 'a', 'b', 'c' ], options: { '--': [], mini: true } }
cli
  .command("[...files]", "sample")
  .option("--mini", "Minimize output")
  .action((files, options) => {
    console.log({ files, options });
  });
```

### 提供一个数组作为选项值

```bash
node cli.js --include project-a
# The parsed options will be:
# { include: 'project-a' }
node cli.js --include project-a --include project-b
# The parsed options will be:
# { include: ['project-a', 'project-b'] }
```

### 错误处理

全局处理错误值

```ts
try {
  // 只 parse 不运行
  cli.parse(process.argv, { run: false });
  // 使用这个指令手动运行
  await cli.runMatchedCommand();
} catch (error) {
  // Handle error here..
  // e.g.
  // console.error(error.stack)
  // process.exit(1)
}
```
