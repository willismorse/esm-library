const { green, cyan, red, yellow } = require('chalk');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const getConfig = require('../package.json');

const stdio = ['pipe', 'pipe', 'inherit'];
const libRoot = path.join(__dirname, '../dist');


/** Functions */
const clean = dir => fse.existsSync(dir) && fse.remove(dir);

const buildPackage = (outputlib, libName) => {
    try {
        execa.shell(`cp ${outputlib}/.npmrc ${outputlib}/${libName}`);
    } catch (error) {
        console.log(error);
    }

    const pkgJson = require('../package.json');

    fse.writeJson(
        path.join(outputlib + '/' + libName, 'package.json'),
        {
            name: pkgJson.name,
            version: pkgJson.version,
            description: pkgJson.description,
            modules: 'bundle.esm.js',
            scripts: pkgJson.scripts,
            dependencies: pkgJson.dependencies,
            devDependencies: pkgJson.devDependencies,
        },
        { spaces: 4 }
    );
};

const step = (name, root, fn) => async () => {
    console.log(cyan('Cleaning: ') + green(root + '/' + name));
    await clean(root + '/' + name);

    console.log(cyan('Building: ') + green(name) + ' Package');
    await fn();

    console.log(cyan('Creating: package file for ' + yellow(name)));
    await buildPackage(root, name);

    console.log(cyan('Done: ') + green(name));
};

/**
 * Run babel over the src directory and output compiled modules.
 */
const buildComponents = step('', libRoot, () =>
    execa.shell( `./node_modules/.bin/rollup -c rollup.config.js`, { stdio }  )
);

console.log(green('Starting: ') + `Builing NPM library packages for ${getConfig.name} `);

Promise.all([buildComponents()]).catch(err => {
    if (err) {
        console.error(red(err.stack || err.toString()));
    }
    process.exit(1);
});
