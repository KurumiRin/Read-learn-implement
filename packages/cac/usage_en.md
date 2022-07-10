[English](./usage_en.md) | [中文](./usage_cn.md)

## How to start learn cac

> npx tsx ./cac/index.ts

After do this you will get a log:

> { args: [], options: { '--': [], type: 'index.ts' } }

More demo please jump to [demo](./demo.ts).

## How to make help messgae

```ts
cli.options("--name <name>", "Provide your name");
// option this, you can use -h or --help to show help messgae
cli.help();
// option this, you can use -v or --version to show version
cli.version("0.0.0");
// this is required, you must call this for the configuration command to take effect
cli.parse();
```

## Custom directive

You can implement custom configuration items by means of chain calls.

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

You can view the final running effect through:

> npx tsx index.ts rm foo -r

If you need to quote the name of an option, you can quote `kebab-case` with `camelCase`, for example:

```ts
cli
  .command("dev", "start dev server")
  .option("--clear-screen", "clear command screen")
  .action((options) => {
    // camelCase references the kebab-case option
    console.log(options.clearScreen);
  });

cli.parse();
```

### Brackets

In the command name, cac supports both `[]` square brackets and `<>` pointed brackets.

In the command name.

- **Square brackets**: indicates optional values
- **Pointed brackets**: indicates mandatory values

In the option value.

- **sharp brackets**: string or number
- **Square brackets**: true

```ts
// The folder here is a mandatory value, the level of the following options is a number or string
cli
  .command("deploy <folder>", "Deploy a folder to serve")
  .option("--scale [level]", "Scaling level")
  .action((folder, options) => {
    console.log({ folder, options });
  });
```

### Negative value

In order to support negation, the case of declaring negation needs to be shown

```ts
// Note: if --config is present, then the negative value must be no-xxx
cli
  .command("dev <project>", "Start DevServer")
  .option("--no-config", "disabled config")
  .option("--config <path>", "Use a custom path")
  .action((project, options) => {
    console.log({ project, options });
  });
```

### Variable parameters

The last argument of the command can be variable (must be the last argument)

Creating a variable parameter is a matter of adding `...' to the very beginning of the bracketed value. `

```ts
cli
  .command("dev <project> [...otherFiles]", "Start DevServer")
  .action((project, otherFiles, options) => {
    console.log({ project, otherFiles, options });
  });
```

If you enter `dev d g f`

Then `project` is `d` and `otherFiles` is `[g, f]`

### Instructions in the form of objects

cac can also receive commands in the form of objects, which ultimately take the form of `. ` combination

```ts
// build --env.bar baz --env.foo foo2
// console this: { '--': [], env: { bar: 'baz', foo: 'foo2' } }
cli
  .command("build", "desc")
  .option("--env <env>", "set env")
  .action((options) => {
    console.log({ options });
  });
```

### The default command

Register a command, and if none is triggered, then this default command will be triggered

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

### Given an array of values

```bash
node cli.js --include project-a
# The parsed options will be:
# { include: 'project-a' }
node cli.js --include project-a --include project-b
# The parsed options will be:
# { include: ['project-a', 'project-b'] }
```

### Error Handling

Global handling of error values

```ts
try {
  // Only parse does not run
  cli.parse(process.argv, { run: false });
  // Use this command to manually run
  await cli.runMatchedCommand();
} catch (error) {
  // Handle error here..
  // e.g.
  // console.error(error.stack)
  // process.exit(1)
}
```
