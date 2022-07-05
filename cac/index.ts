import cac from 'cac'
const cli = cac()
cli.option('--type <type>', 'Choose a type', {
  default:'none',
})
const parsed = cli.parse()
console.log({ parsed })
