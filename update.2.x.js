'use strict';

// Update the deps version from rekit repo
// rekit repo is supposed to be have up-to-date versions.
// ensure rekit repo is in the same folder with rekit-deps

const fs = require('fs');
const path = require('path');

const depsFile = path.join(__dirname, 'deps.2.x.json');

const rekitPkg = require('../rekit/package.json');
const deps = require(depsFile);

const vers = Object.assign({}, rekitPkg.dependencies, rekitPkg.devDependencies);

let updated = 0;
for (let p in deps.dependencies) {
  if (!vers[p]) throw `Can't find dep: ${p} in rekit package.json`;
  if (vers[p] !== deps.dependencies[p]) {
    console.log('dep: ', `\x1b[36m${p}\x1b[0m`, deps.dependencies[p], '\x1b[34m->\x1b[0m', vers[p]);
    deps.dependencies[p] = vers[p];
    updated += 1;
  }
}

for (let p in deps.devDependencies) {
  if (!vers[p]) throw `Can't find dev-dep: ${p} in rekit package.json`;
  if (vers[p] !== deps.devDependencies[p]) {
    console.log('dev-dep: ', `\x1b[36m${p}\x1b[0m`, deps.devDependencies[p], '\x1b[34m->\x1b[0m', vers[p]);
    deps.devDependencies[p] = vers[p];
    updated += 1;
  }
}

fs.writeFileSync(depsFile, JSON.stringify(deps, null, '  '));

if (updated === 0) console.log('It\'s already up to date.');
else console.log(`${updated} dependencies updated.`);
console.log('Done.');
