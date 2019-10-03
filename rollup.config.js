import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

const release = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife'
  },
  plugins: [
    release && eslint(),
    release && terser()
  ]
}
