## cac 分析目录

```
cac
├─ .editorconfig
├─ .gitattributes
├─ .github
│    ├─ FUNDING.yml
│    └─ ISSUE_TEMPLATE.md
├─ .gitignore
├─ .prettierrc
├─ LICENSE
├─ README.md
├─ circle.yml
├─ examples
├─ index-compat.js
├─ jest.config.js
├─ mod.js
├─ mod.ts
├─ mod_test.ts
├─ package.json
├─ rollup.config.js
├─ scripts
│    └─ build-deno.ts
├─ src
│    ├─ CAC.ts
│    ├─ Command.ts
│    ├─ Option.ts
│    ├─ __test__
│    ├─ deno.ts
│    ├─ index.ts
│    ├─ node.ts
│    └─ utils.ts
├─ tsconfig.json
└─ yarn.lock
```

- [`.editorconfig`](./cac-files/.editorconfig.md)

- [`.gitattributes`](./cac-files/.gitattributes.md)

- `.github` github 相关配置

  - `FUNDING.yml` 赞助相关的配置文件

  - `ISSUE_TEMPLATE.yaml` ISSUE 模板，提 ISSUE 时 Github 自动识别读取注入。

- [`.gitignore`](./cac-files/.gitignore.md)

- [`.prettierrc`](./cac-files/.prettierrc.md)

- `LICENSE` 开源协议文件

- [`README.md` ](./cac-files/README.md)

- [`circle.yaml`](./cacFiles/circle.yml.md) CircleCI 的配置文件

- [`examples`](./cac-files/examples.md) cac 使用示例文件

- [`index.compat.js`](./cacFiles/index.compat.md) cac 项目主入口

- [`jest.config.js`](./cacFiles/jest.config.md) jest 配置文件

- `mod.\*` 兼容 deno

- `package.json`

- `rollup.config.js` rollup 配置文件（主要是打包用的）

- `tsconfig.json` TS 配置文件

- `scripts` 项目中用到的脚本

- `src` cac 项目主目录

- `yarn.lock` yarn 的依赖锁文件
