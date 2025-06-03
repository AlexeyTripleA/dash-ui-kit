import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import glob from 'fast-glob'

const inputFiles = [
  ...glob.sync('src/react/components/**/index.@(ts|tsx)'),
  ...glob.sync('src/react/contexts/**/index.@(ts|tsx)')
]
const dir = 'dist/react'

const sharedPlugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  postcss({ extract: true, minimize: true, modules: false }),
  babel({
    babelHelpers: 'bundled',
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    presets: ['@babel/preset-typescript','@babel/preset-react'],
    include: ['src/**/*']
  })
]

export default [
  // ESM
  {
    input: inputFiles,
    output: {
      dir: dir,
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src/react',
      entryFileNames: '[name].esm.js',
      sourcemap: true
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
    output: {
      dir: dir,
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src/react',
      entryFileNames: '[name].cjs.js',
      exports: 'named',
      sourcemap: true
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
  }
]
