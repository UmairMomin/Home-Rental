#!/usr/bin/env node

/**
 * Bismillah ar-Rahmaan ar-Raheem
 *
 * ejs-preview
 *
 * (c) 2020 Amrayn Web Services
 * (c) 2020 @abumusamq
 *
 * This library is released under the MIT Licence.
 *
 * https://amrayn.com
 * https://humble.js.org
 */

const fs = require('fs');
const pathResolve = require('path').resolve;
const express = require('express');
const ejs = require('ejs');
const minimist = require('minimist');
const chalk = require('chalk');

const args = minimist(process.argv);

const templateRoot = args.root; // root directory of template

if (!templateRoot) {
  console.error(chalk.red('Template root not specified.'));
  process.exit(1);
}

console.log('Template root %s', templateRoot);

if (!fs.existsSync(pathResolve(templateRoot))) {
  console.error(chalk.red('Template root [%s] does not exist.'), pathResolve(templateRoot));
  process.exit(1);
}

const previewBaseData = args.common;
if (!previewBaseData) {
  console.warn(chalk.yellow('WARNING: Preview base data not specified (--common) - you will need to specify it with each request'));
} else if (!fs.existsSync(pathResolve(`${templateRoot}/${previewBaseData}`))) {
  console.error(chalk.red('Common data file [%s] does not exist'), pathResolve(`${templateRoot}/${previewBaseData}`));
}

const app = express();
const port = process.env.PORT || 3000;

const cleanRequire = f => {
  delete require.cache[require.resolve(f)];
  return require(f);
}

app.get('/', (req, res) => {
  const baseDataFile = fs.existsSync(`${templateRoot}/${req.query.common}.js`) ? `${templateRoot}/${req.query.common}.js`
    : pathResolve(`${templateRoot}/${previewBaseData}`);

  console.debug('Base data file %s', baseDataFile);

  const baseData = baseDataFile ? cleanRequire(baseDataFile) : {};

  const ejsFile = req.query.template || template;

  const previewFilename = `${templateRoot}/${req.query.template}.preview.js`;
  const templateDataFile = fs.existsSync(pathResolve(previewFilename)) ? pathResolve(previewFilename)
    : null;

  console.debug('Template data file %s', previewFilename);

  const templateData = templateDataFile ? cleanRequire(templateDataFile) : {};
  const templateFile = `${templateRoot}/${ejsFile}.ejs`;
  const isPlain = typeof req.query.plain !== 'undefined';

  ejs.renderFile(pathResolve(templateFile), {
    base: baseData,
    ...templateData,
  }, { async: false }, (err, str) => {
    if (err) {
      console.error(err);
      res.setHeader('Content-Type', 'text/html');
      res.send('Render error<br/>' + err);
    } else {
      if (isPlain) {
        res.setHeader('Content-Type', 'text/plain');
      } else {
        res.setHeader('Content-Type', 'text/html');
      }
      res.send(str);
    }
  });
});

app.listen(port, () => console.log(`
  EJS template preview available on ${port}!
  ----
  POSSIBLE QUERY PARAMETERS

  http://localhost:${port}?template=emails/welcome
  http://localhost:${port}?template=emails/welcome-plain&plain
  http://localhost:${port}?base=emails/welcome-plain&plain
  http://localhost:${port}?base=custom-base
`))
