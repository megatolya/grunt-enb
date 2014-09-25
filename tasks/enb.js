/*
 * grunt-enb
 * https://github.com/megatolya/grunt-enb
 *
 * Copyright (c) 2013 Anatoliy Ostrovskiy
 * Licensed under the MIT license.
 */

'use strict';

var resolve = require('path').resolve.bind(process.cwd()),
    extend = function (a, b) { for (var x in b) {a[x] = b[x];  } return a; };

module.exports = function(grunt) {
    var enb = require('enb/lib/server/server-middleware');

    grunt.registerMultiTask('enb', 'enb make for project', function () {
        if (!this.data.targets)
            return grunt.log.error('no targets provided');

        var done = this.async(),
            options = extend(this.options({
                    noLog: false
                }), {
                    cdir: resolve(this.options().projectPath || './')
                }
            ),
            enbBuilder = enb.createBuilder(options),
            tasks = [],
            _this = this,
            async = require('async');

        this.data.env && extend(process.env, this.data.env);
        this.data.beforeBuild && this.data.beforeBuild();
        this.data.targets.forEach(function (target) {
            tasks.push(function (callback) {
                enbBuilder(target).then(function () {
                    grunt.log.write(target + '...').ok();
                    callback(null);
                }, function (err) {
                    callback(err);
                });
            });
        });
        async.parallel(tasks, function (err) {
            if (err)
                return grunt.log.error(err);

            _this.data.afterBuild && _this.data.afterBuild();
            done();
        });
    });
};
