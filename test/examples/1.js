import objectPath from 'object-path'

objectPath.get(foo, 'bar.baz')
objectPath.get(foo.bar.baz.bar, 'baz')
objectPath.get(foo.bar, 'baz.bar')
