#!/usr/bin/env node
'use strict';

var program = require('commander');
var babel = require("babel-core");
var fs = require("fs");
var path = require("path");
var process = require("process");
var browserify = require('browserify');

var buildAction = (src, output) => {
  console.log('Building plugin');
  var sourceRel = src;
  var destRel = output;
  var tempRel = 'temp/';
  if (path.isAbsolute(sourceRel)) {
    var sourcePath = sourceRel
  } else {
    sourcePath = path.join(process.cwd(), sourceRel);
  }
  if (path.isAbsolute(destRel)) {
    var destPath = destRel
  } else {
    destPath = path.join(process.cwd(), destRel);
  }
  var tempPath = path.join(process.cwd(), tempRel);

  console.log('Source path : ', sourcePath);
  console.log('Destination path : ', destPath);


  var babelOptions = {
    presets: [
      "es2015",
      "react"
    ],
    plugins: [
      "transform-react-jsx",
      "inline-import-data-uri"
    ]
  }


  var tempfiles = []
  var jsList = []

  /* Files sorting and babel */
  fs.readdirSync(sourcePath).forEach(file => {
    if (!fs.existsSync(destPath)) {
      console.log('[init] making plugin directory...');
      fs.mkdirSync(destPath);
      console.log('[init] making plugin directory...done');
    }
    if (!fs.existsSync(tempPath)) {
      console.log('[init] making temporary directory...');
      fs.mkdirSync(tempPath);
      console.log('[init] making temporary directory...done');
    }
    fs.copyFileSync(path.join(sourcePath, file), path.join(tempPath, file))
    tempfiles.push(path.join(tempPath, file));

    if (file.endsWith('.js')){
      console.log('[babel conversion] js file conversion...');
      var filePath = path.join(sourcePath, file);
      var newfilePath = path.join(tempPath, file);
      var newCode = babel.transformFileSync(filePath, babelOptions).code;
      jsList.push(path.join(tempPath,file));
      fs.writeFileSync(newfilePath, newCode);
      console.log('[babel conversion] js file conversion...done');
    } else if (file==="node_modules"){
      //just in case
    } else {
      console.log('[plugin directory] copying source file to plugin...');
      fs.copyFileSync(path.join(sourcePath, file), path.join(destPath, file))
      console.log('[plugin directory] copying source file to plugin...done');
    }
  });

  console.log('[bundling] creating bundle...');
  /* Bundling with browserify */
  var b = browserify(jsList, {
    standalone: "Main"
  });
  console.log('[bundling] writing bundle...');
  console.log(path.join(destPath, 'plugin.js'));
  var bundlePath = fs.createWriteStream(path.join(destPath, 'plugin.js'));
  b.bundle().pipe(bundlePath);

  /* Remove temp file */

  bundlePath.on('finish', function(){
    console.log('[clearing up]');
    console.log('[clearing up] deleting temporary files...');
    for (var i = 0; i < tempfiles.length; i++) {
      fs.unlinkSync(tempfiles[i])
    }
    console.log('[clearing up] deleting temporary files...done');

    fs.rmdirSync(tempPath, (err => {
      console.log(err);
    }))
  })
}

console.log('Welcome to the Skripto Plugin Builder');
program
  .version('0.0.1')
  .command('build <src> <output>')
  .description('Description.')
  .option('-s, --src [src]', 'Source code directory; default is src/', 'src/')
  .option('-o, --output [output]', 'Plugin directory; default is plugin/', 'plugin/')
  .action(buildAction)

program.parse(process.argv)

/* Config */



/*for (var i = 0; i < jsList.length; i++) {
  fs.unlinkSync(jsList[i])
}
fs.rmdirSync(tempPath, (err => {
  console.log(err);
}))
*/
