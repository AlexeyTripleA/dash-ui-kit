import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import fs from 'fs'
import path from 'path'

// Simple plugin to add 'use client' directive to React components
const addUseClientDirective = () => {
  return {
    name: 'add-use-client',
    writeBundle(options, bundle) {
      // Get the output directory
      const outputDir = options.dir || path.dirname(options.file)
      
      // Check if this build is for React components
      const isReactBuild = outputDir.includes('react')
      
      if (isReactBuild) {
        // For each file in the bundle
        Object.keys(bundle).forEach(fileName => {
          if (fileName.endsWith('.js') || fileName.endsWith('.cjs')) {
            const filePath = path.join(outputDir, fileName)
            
            try {
              // Read the file
              const content = fs.readFileSync(filePath, 'utf-8')
              
              // Add 'use client' directive if not present
              if (!content.startsWith("'use client'")) {
                const newContent = `'use client';\n${content}`
                fs.writeFileSync(filePath, newContent, 'utf-8')
                console.log(`Added 'use client' directive to ${fileName}`)
              }
            } catch (err) {
              console.warn(`Could not add 'use client' directive to ${fileName}:`, err)
            }
          }
        })
      }
    }
  }
}

export default [
  // React components build
  {
    input: 'src/react/index.ts',
    output: [
      {
        file: 'dist/react/index.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/react/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    plugins: [
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declarationDir: 'dist/react',
      }),
      addUseClientDirective(),
    ],
  },
  // Main index build
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    plugins: [
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declarationDir: 'dist',
      }),
      addUseClientDirective(),
    ],
  },
]
