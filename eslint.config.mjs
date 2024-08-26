import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    markdown: true,
    yaml: true,
  },
  // {
  //   files: ['.vitepress/**/*.ts'],
  //   // files: ['.vitepress/config.ts'],
  // },
)
