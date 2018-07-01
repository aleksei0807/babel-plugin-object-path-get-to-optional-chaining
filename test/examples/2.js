import { get, set } from 'object-path'

get(foo, 'bar.baz')
get(foo.bar.baz.bar, 'baz')
get(foo.bar, 'baz.bar')
