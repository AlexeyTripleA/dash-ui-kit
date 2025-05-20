import multiInput from 'rollup-plugin-multi-input';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import glob from 'fast-glob';

const inputFiles = glob.sync('src/components/**/index.@(ts|tsx)');

export default {

  input: inputFiles,
  output: {
    dir: 'dist/components',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src/components', // ← удаляет 'src/components' из пути
    entryFileNames: '[name].js',
    sourcemap: true,
  },

  // input: ['src/components/**/index.ts', 'src/components/**/index.tsx'],
  // output: {
  //   dir: 'dist',
  //   format: 'esm',
  //   preserveModules: true,
  //   entryFileNames: '[name].js',
  //   sourcemap: true,
  // },
  plugins: [
    peerDepsExternal(),
    // multiInput(),
    resolve(),
    commonjs(),
    postcss({
      extract: true,
      minimize: true,
      modules: false,
    }),
    typescript({
      tsconfig: './tsconfig.build.json',
      noEmit: true,
      outputToFilesystem: false,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
      presets: ['@babel/preset-typescript', '@babel/preset-react'],
      include: ['src/**/*'],
    }),
  ],
};