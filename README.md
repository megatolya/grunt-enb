# grunt-enb

> Making bem project with grunt

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-enb --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-enb');
```

### Overview
In your project's Gruntfile, add a section named `enb` to the data object passed into `grunt.initConfig()`. Here is an example config that demonstrates all functionality of grunt-enb

```js
grunt.initConfig({
    enb: {
        firefox: {
            beforeBuild: function () {
                console.log('beforeBuild');
            },
            afterBuild: function () {
                console.log('afterBuild');
            },
            env: {
                XJST_ASYNCIFY: 1,
                BROWSER: 'firefox'
            },
            targets: ['pages-desktop/index/']
        },
        options: {
            noLog: true,
            projectPath: 'path/to/bem-project'
        }
    }
})
```

