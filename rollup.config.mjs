import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import babel from '@rollup/plugin-babel'
import glob from 'fast-glob'

const inputFiles = {
  index: 'src/react/index.ts'  // Только один главный entry point
}
const dir = 'dist/react'

const external = [
  'react',
  'react-dom',
  'tslib',
  'class-variance-authority'
]

const isExternal = (id) => {
  return external.some(dep => id === dep || id.startsWith(`${dep}/`))
}

const sharedPlugins = [
  // peerDepsExternal(),
  resolve({
    preferBuiltins: false,
    browser: true,
    exportConditions: ['browser', 'module', 'import', 'default'],
  }),
  commonjs({
    include: /node_modules/
  }),
  babel({
    babelHelpers: 'bundled',
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic'
        }
      ]
    ],
    include: ['src/**/*'],
    exclude: /node_modules/
  })
]

const banner = `"use client";\n`

export default [
  // ESM
  {
    input: inputFiles,
    external: isExternal,
    output: {
      dir: dir,
      format: 'esm',
      preserveModules: false, // ← include all in bundle
      entryFileNames: '[name].esm.js',
      inlineDynamicImports: true,
      sourcemap: true,
      banner: banner
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: { outDir: 'dist/react' },
        noEmit: true,
        outputToFilesystem: false
      }),
      ...sharedPlugins
    ]
  },
  // CJS
  {
    input: inputFiles,
    external: isExternal,
    output: {
      dir: dir,
      format: 'cjs',
      preserveModules: false,  // ← Встраиваем все в bundle
      entryFileNames: '[name].cjs.js',
      inlineDynamicImports: true,  // ← Встраиваем всё в один файл
      exports: 'named',
      sourcemap: true,
      banner: banner
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: { outDir: 'dist/react' },
        noEmit: true,
        outputToFilesystem: false
      }),
      ...sharedPlugins
    ]
  },
  
  // Tailwind v4 theme
  {
    input: 'src/styles/styles.pcss',
    output: {
      file: 'dist/styles.css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        modules: false,
        inject: false,
        config: {
          path: './postcss.config.cjs'
        }
      })
    ]
  },
  // Raw theme
  {
    input: 'src/styles/theme.pcss',
    output: {
      file: 'dist/theme.css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        modules: false,
        inject: false,
        plugins: [
          postcssImport()
        ]
      })
    ]
  }
]
