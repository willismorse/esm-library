import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
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
        }

    ],
    plugins: [

        // Provide the base folder from which to start resolving all absolute paths
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