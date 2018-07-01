import { get as objGet } from 'object-path'

objGet(foo, 'bar.baz')
objGet(foo.bar.baz.bar, 'baz')
objGet(foo.bar, 'baz.bar')
