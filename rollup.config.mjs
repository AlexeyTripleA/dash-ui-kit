import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import glob from 'fast-glob'

const inputFiles = glob.sync('src/components/**/index.@(ts|tsx)')
const dir = 'dist/components'

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
      preserveModulesRoot: 'src/components',
      entryFileNames: '[name].esm.js',
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: { outDir: 'dist/components' },
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
      preserveModulesRoot: 'src/components',
      entryFileNames: '[name].cjs.js',
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: { outDir: 'dist/components' },
        noEmit: true,
        outputToFilesystem: false
      }),
      ...sharedPlugins
    ]
  }
]
