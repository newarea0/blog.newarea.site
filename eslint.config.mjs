import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    markdown: true,
    yaml: true,

    rules: {
      'ts/consistent-type-definitions': 'off',
      'style/member-delimiter-style': 'off',
    },
  },
  // {
  //   files: ['.vitepress/**/*.ts'],
  //   // files: ['.vitepress/config.ts'],
  // },
)
