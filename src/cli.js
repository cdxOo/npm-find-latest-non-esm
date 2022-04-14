#!/usr/bin/env node

'use strict';
var { program } = require('commander');
var pacote = require('pacote');
var pkg = require('../package.json');

program
    .version(pkg.version)
    .usage('<package_name> [...<package_name>]')
    .argument('<packages...>')

program.parse(process.argv);

var run = async (options, args) => {
    var latest = [];
    for (var name of args) {
        var data = await pacote.packument(name, { fullMetadata: true });
        var versions = Object.keys(data.versions);
        
        var nonESM = versions.filter(v => (
            data.versions[v].type != 'module'
        )).reverse();

        latest.push(`${name}@${nonESM[0]}`);
    }

    console.log(latest.join("\n"));
}

run(program.opts, program.args);
