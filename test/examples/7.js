import objectPath, { get as objGet, set as objSet } from 'object-path'

objGet(foo, 'bar.baz')
objGet(foo.bar.baz.bar, 'baz')
objGet(foo.bar, 'baz.bar')
objectPath.set(foo, 'baz')
