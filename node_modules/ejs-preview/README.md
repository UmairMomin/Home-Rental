# EJS Preview
Preview EJS template by providing JSON data

<p align="center">
    •   •   •
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/ejs-preview">
    <img alt="" src="https://img.shields.io/npm/v/ejs-preview.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/amrayn/ejs-preview/blob/master/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/ejs-preview?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Donate via PayPal" href="https://amrayn.com/donate">
    <img alt="" src="https://img.shields.io/static/v1?label=Donate&message=PayPal&color=purple&style=for-the-badge&labelColor=000000">
  </a>
</p>

<p align="center">
    •   •   •
</p>

## Installation

```bash
npm i ejs-preview -S
```

```bash
yarn add ejs-preview
```

```
ejs-preview --root=/path/to/root/files --common=/json/file.json
```

* `root`: Path to the root files. e.g, `/app/src/templates`
* `common`: Path to JSON file. Common data for all the templates. e.g, `/app/src/templates/preview-common.json`

Once server is running you can pass following query parameters

* `template`: EJS file base to render (relative to root) e.g, `?template=emails/welcome` will render `<root>/emails/welcome.ejs`.

  The template specific data is picked up from `<root>/emails/welcome.preview.js` which should look like:

```
module.exports = {
  activationLink: '/link',
};
```
* `common` If you want to override `common` args provided at the startup
* `plain` If specified `plain/text` content-type is sent

You can change the port with `PORT` environment variable


# License
```
Copyright (c) 2020 Amrayn Web Services
Copyright (c) 2020 @abumusamq

https://github.com/amrayn/
https://amrayn.com
https://humble.js.org

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

