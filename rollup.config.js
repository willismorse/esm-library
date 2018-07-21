import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const    env = process.env.NODE_ENV;
import includePaths from 'rollup-plugin-includepaths';


// rollup.config.js
export default {
    // experimentalDynamicImport: true,
    input: 'src/index.js',
    output: [
        {
            sourcemap: true,
            file: 'dist/bundle.esm.js',
            format: 'esm'
        },
        {
            sourcemap: true,
            file: 'dist/bundle.umd.js',
            format: 'umd',
            name: 'test-lib'
        },

    ],
    plugins: [
        includePaths( {
            include: {},
            paths: ['src']
        }),
        nodeResolve(),

        commonjs({
            include: 'node_modules/**'
        } )
    ]

};