

# Build the library
```
yarn build
```

# Publish the library
```
cd dist
yarn publish
```



This library is an ESM bundle that is published as a node package called `library`. Obviously, you won't be able to publish this to the public npm registry with this package name; I recommend running a docker image of [Verdaccio](https://github.com/verdaccio/verdaccio) locally to try this out.

_You might be tempted to use the `node link` trick to bypass using a real npm registry. However, this uses a symlink  that can confuse tooling such as VSCode and Webstorm: since you aren't changing versions in package.json and since the symlink itself doesn't change modification date reliably when the directory contents change, any tool that relies on a filewatcher that is looking at package.json or on the package folder within node_modules may be confused. Webstorm in particular does not like this. YMMV, just be sure to exercise it carefully before relying it; not recognizing changes to your package can result in really subtle and hard-to-diagnose problems._

# Implementation notes

This library tests the ability to produce (and subsequently consume) code that contains classes distributed throughout a filesystem hierarchy:
* The root of the built library contains an index.js with all exports. Any classes NOT exported in this file are invisible outside the library
* ChildClass lives within a subdirectory within the ParentClass directory
* There are two classes with the same name `StringUtils`, in different directories, in order to explore how much disambuiguation is provided by the tools and how much is up to the developer:
    * when you import these files in your index.js file, the module specifier path guarantees uniqueness, but you must manually disambigutate by providing unique import targets or the file will not compile: `import <import-target> from <module-specifier>`
    * when you build, rollup flattens all hiearchies and places all classes at the top level. As part of this process it will generate disambiguated class names, so both StringUtils will not collide. Note that these disambiguated class names are not available outside the library. The import targets that you had to write in the index.js file (in the previous step) already had to be unique, and you used them in the export statements as well.

In this library all hierarchical module specifiers are specified as absolute paths, in the form `Parent/ParentClass`. Note that this is technically a violation (or hack upon) the strict ESM module specification, which only works out of the box with relative paths. In reality, these "absolute" paths are not really absolute, they are implicitly in the form `<path-to-project>/src/Parent/ParentClass`

In any codebase with broad deep hierarchies, relative paths will quickly become unreadable and unmanageable. Absolute paths are preferable for readability and because that's the way all other language module systems do it. One reasonable exception is probably using relative paths when the files are in the same directory.

# Setting up tools
In order to make these faux absolute paths work in practice, ALL tools that will view this code must be informed about the base folder. 

## Webstorm/IntelliJ
Webstorm tooling can handle absolute import paths. Webstorm uses the `resolve.root` path entry in `webpack.config.js` to provide the `<path-to-project>/src` portion of the absolute path.

### Navigation
OOB, WebStorm will navigate correctly to the implementation of a class that has been imported via absolute path: `command-click` on the class name to jump to the file.

### Auto-add imports
OOB, Webstorm will suggest relative paths when asked to generate import statements, but a preference will enable absolute paths instead. Open the Preferences dialog and navigate to `Editor | Code Style | JavaScript | Imports`. Enable `Use paths relative to project, resource or sources roots`

## VSCode
VSCode tooling can somewhat handle absolute import paths. VSCode uses the `compilerOptions.baseURL` path entry in `jsconfig.json` to provide the `<path-to-project>/src` portion of the absolute path.

### Navigation
OOB, VSCode will navigate correctly to the implementation of a class that has been imported via absolute path: `command-click` on the class name to jump to the file.

### Auto-add imports
VSCode does not provide generation of import statements, although support is in place within the underlying language server and there are many VSCode extensions that make this feature available. 

## Rollup
Rollup does not support absolute module specifier paths OOB, but it can be easily added using the `rollup-plugin-includepaths`. See the `includePaths` section of `rollup.config.js` for details.
