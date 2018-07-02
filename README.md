# babel-plugin-object-path-get-to-optional-chaining

> This plugin replaces objectPath.get ([object-path](https://github.com/mariocasciaro/object-path)) to [new optional chaining syntax](https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-chaining.html) and remove unused object-path imports.

**WORKING ONLY WITH BABEL 7. THIS PLUGIN NOT WORKING WITH BABEL 6.**

## Install

Babel install:
```sh
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

Plugin install:
```sh
npm i -D babel-plugin-object-path-get-to-optional-chaining
```

## Usage

**.babelrc**
```
{
  "presets": [ "@babel/env" ],
  "plugins": [
    "object-path-get-to-optional-chaining"
  ]
}
```

```sh
./node_modules/.bin/babel src --out-dir src
```

## Examples

from:
```javascript
import objectPath from 'object-path'

objectPath.get(foo, 'bar.baz')
objectPath.get(foo.bar.baz.bar, 'baz')
objectPath.get(foo.bar, 'baz.bar')
```

to:
```javascript
foo?.bar?.baz;
foo.bar.baz.bar?.baz;
foo.bar?.baz?.bar;
```

---

from:
```javascript
import { get, set } from 'object-path'

get(foo, 'bar.baz')
get(foo.bar.baz.bar, 'baz')
get(foo.bar, 'baz.bar')
```

to:
```javascript
import { set } from 'object-path';

foo?.bar?.baz;
foo.bar.baz.bar?.baz;
foo.bar?.baz?.bar;
```

---

from:
```javascript
import { get } from 'object-path'

get(foo, 'bar.baz')
get(foo.bar.baz.bar, 'baz')
get(foo.bar, 'baz.bar')
```

to:
```javascript
foo?.bar?.baz;
foo.bar.baz.bar?.baz;
foo.bar?.baz?.bar;
```

---

from:
```javascript
import { get as objGet } from 'object-path'

objGet(foo, 'bar.baz')
objGet(foo.bar.baz.bar, 'baz')
objGet(foo.bar, 'baz.bar')
```

to:
```javascript
foo?.bar?.baz;
foo.bar.baz.bar?.baz;
foo.bar?.baz?.bar;
```

---

from:
```javascript
import { get as objGet, set as objSet } from 'object-path'

objGet(foo, 'bar.baz')
objGet(foo.bar.baz.bar, 'baz')
objGet(foo.bar, 'baz.bar')
```

to:
```javascript
import { set as objSet } from 'object-path';

foo?.bar?.baz;
foo.bar.baz.bar?.baz;
foo.bar?.baz?.bar;
```

---

from:
```javascript
import objectPath, { get as objGet, set as objSet } from 'object-path'

objGet(foo, 'bar.baz')
objGet(foo.bar.baz.bar, 'baz')
objGet(foo.bar, 'baz.bar')
```

to:
```javascript
import { set as objSet } from 'object-path';

foo?.bar?.baz;
foo.bar.baz.bar?.baz;
foo.bar?.baz?.bar;
```

---

from:
```javascript
import objectPath, { get as objGet, set as objSet } from 'object-path'

objGet(foo, 'bar.baz')
objGet(foo.bar.baz.bar, 'baz')
objGet(foo.bar, 'baz.bar')
objectPath.set(foo, 'baz')
```

to:
```javascript
import objectPath, { set as objSet } from 'object-path';

foo?.bar?.baz;
foo.bar.baz.bar?.baz;
foo.bar?.baz?.bar;
objectPath.set(foo, 'baz');
```

---

from:
```javascript
import objectPath, { get as objGet, set as objSet } from 'object-path'

objGet(foo, 'bar.baz')
objGet(foo.bar.baz.bar, 'baz')
objGet(foo.bar, 'baz.bar')
objectPath[cond ? 'get' : 'set'](foo, 'bar')
```

to:
```javascript
import objectPath, { set as objSet } from 'object-path';

foo?.bar?.baz;
foo.bar.baz.bar?.baz;
foo.bar?.baz?.bar;
objectPath[cond ? 'get' : 'set'](foo, 'bar');
```
