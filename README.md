# grunt-enb

> Вызов enb из grunt

## Установка

```shell
npm install grunt-enb --save-dev
```

После установки в `Gruntfile.js` добавить:

```js
grunt.loadNpmTasks('grunt-enb');
```

### Настройка
Пример полного конфига

```js
grunt.initConfig({
    enb: {
        firefox: {
            // функция, которая будет вызвана до enb
            beforeBuild: function () {
                console.log('beforeBuild');
            },
            // функция, которая будет вызвана после enb
            afterBuild: function () {
                console.log('afterBuild');
            },
            // переменные окружения, с которыми нужно запустить enb
            env: {
                XJST_ASYNCIFY: 1,
                BROWSER: 'firefox'
            },
            // цель. Передавать обязательно
            targets: ['pages-desktop/index/']
        },
        options: {
            // не выводить лог enb
            noLog: true,
            // путь до бем проекта, если он отличается от того пути, где находится Gruntfile
            projectPath: 'path/to/bem-project'
        }
    }
})
```

