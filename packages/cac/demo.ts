import cac from 'cac'
const cli = cac()

cli.option('--name <name>', 'Provide your name')

// 通过 -h 和 --help 来显示帮助信息，这会展示所有的指令，如这里设定了 name
cli.help()

// 通过 -v 或 --version 展示版本信息，版本信息同样会在 help message 中出现
cli.version('0.0.0')

// 必须执行这一条
// cli.parse()

cli
  .command('rm <dir>', 'Remove a dir')
  .option('-r, --recursive', 'Remove recursively')
  .action((dir, options) => {
    console.log(`remove ${dir}${options.recursive ? ' recursively' : ''}`)
  })

cli.parse()

// 可以通过 npx tsx index.ts rm foo -r 来查看运行效果