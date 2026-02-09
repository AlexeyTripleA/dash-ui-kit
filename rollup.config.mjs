import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import babel from '@rollup/plugin-babel'
import glob from 'fast-glob'

// React - preserve module structure
const reactInputFiles = [
  'src/react/index.ts',
  ...glob.sync('src/react/components/**/index.@(ts|tsx)'),
  ...glob.sync('src/react/contexts/**/index.@(ts|tsx)')
]

// React Native - single bundle for now
const reactNativeInputFiles = {
  index: 'src/react-native/index.ts'
}

// Shared - single bundle
const sharedInputFiles = {
  index: 'src/shared/index.ts'
}

const external = [
  'react',
  'react-dom',
  'react-native',
  'react-native-svg',
  'expo-blur',
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
  // React ESM (preserve modules)
  {
    input: reactInputFiles,
    external: isExternal,
    output: {
      dir: 'dist/react',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src/react',
      entryFileNames: '[name].esm.js',
      sourcemap: true,
      banner: banner
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json'
      }),
      ...sharedPlugins
    ]
  },
  // React CJS (preserve modules)
  {
    input: reactInputFiles,
    external: isExternal,
    output: {
      dir: 'dist/react',
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
        tsconfig: './tsconfig.rollup.json'
      }),
      ...sharedPlugins
    ]
  },
  // React Native ESM
  {
    input: reactNativeInputFiles,
    external: isExternal,
    output: {
      dir: 'dist/react-native',
      format: 'esm',
      preserveModules: false,
      entryFileNames: '[name].esm.js',
      inlineDynamicImports: true,
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json'
      }),
      ...sharedPlugins
    ]
  },
  // React Native CJS
  {
    input: reactNativeInputFiles,
    external: isExternal,
    output: {
      dir: 'dist/react-native',
      format: 'cjs',
      preserveModules: false,
      entryFileNames: '[name].cjs.js',
      inlineDynamicImports: true,
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json'
      }),
      ...sharedPlugins
    ]
  },
  // Shared ESM
  {
    input: sharedInputFiles,
    external: isExternal,
    output: {
      dir: 'dist/shared',
      format: 'esm',
      preserveModules: false,
      entryFileNames: '[name].esm.js',
      inlineDynamicImports: true,
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json'
      }),
      ...sharedPlugins
    ]
  },
  // Shared CJS
  {
    input: sharedInputFiles,
    external: isExternal,
    output: {
      dir: 'dist/shared',
      format: 'cjs',
      preserveModules: false,
      entryFileNames: '[name].cjs.js',
      inlineDynamicImports: true,
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json'
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
