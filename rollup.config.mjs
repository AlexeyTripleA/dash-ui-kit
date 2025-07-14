import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import glob from 'fast-glob'

const inputFiles = [
  'src/react/index.ts',
  ...glob.sync('src/react/components/**/index.@(ts|tsx)'),
  ...glob.sync('src/react/contexts/**/index.@(ts|tsx)')
]
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
  peerDepsExternal(),
  resolve({
    preferBuiltins: false,
    browser: true
  }),
  commonjs(),
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
    include: ['src/**/*']
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
      preserveModules: true,
      preserveModulesRoot: 'src/react',
      entryFileNames: '[name].esm.js',
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
      preserveModules: true,
      preserveModulesRoot: 'src/react',
      entryFileNames: '[name].cjs.js',
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
    input: 'src/styles/app.pcss',
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
        config: {
          path: './postcss.config.cjs'
        }
      })
    ]
  }
]
