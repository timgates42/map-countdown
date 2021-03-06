import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/bin/route-parser.js',
  output: [
    {
      file: 'bin/route-parser.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node'
    }
  ],
  external: ['fs', 'path', ...Object.keys(pkg.devDependencies || {})],
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/env', { modules: false }]],
      exclude: 'node_modules/**'
    })
  ]
}
