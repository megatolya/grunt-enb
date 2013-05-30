/*
 * grunt-enb
 * https://github.com/megatolya/grunt-enb
 *
 * Copyright (c) 2013 Anatoliy Ostrovskiy
 * Licensed under the MIT license.
 */

'use strict';

function extend (a, b) { for (var x in b) {a[x] = b[x];  } return a; }

module.exports = function(grunt) {
    var enb = require('enb/lib/server/server-middleware');

    grunt.registerMultiTask('enb', 'enb make for project', function () {
        if (!this.data.targets)
            return grunt.log.error('no targets provided');

        var done = this.async(),
                options = this.options({
                noLog: false
            }),
            enbBuilder = enb.createBuilder({ noLog: options.noLog}),
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
