export default function ({ types: t }) {
  let objectPath
  let objectPathName
  let isImportDefault = false
  let isImportSpec = false
  let objectPathGetName
  let usageOthersMethodsDef = false
  let usageOthersMethodsSpec = false

  const createOptExpr = (object, property) => t.optionalMemberExpression(object, property, false, true)

  const transform = (path) => {
    const node = path.node
    const optionalPartArr = node.arguments[1].value.split('.')
    let result

    if (optionalPartArr.length > 1) {
      optionalPartArr.forEach((v, k, arr) => {
        if (k === 0) {
          result = createOptExpr(node.arguments[0], t.identifier(v))
          result = createOptExpr(result, t.identifier(arr[k + 1]))
        } else if (k !== 1) {
          result = createOptExpr(result, t.identifier(v))
        }
      })
    } else {
      result = createOptExpr(node.arguments[0], t.identifier(optionalPartArr[0]))
    }
    path.replaceWith(result)
  }

  return {

    visitor: {

      CallExpression(path) {
        const callee = path.node.callee

        if (isImportDefault && t.isMemberExpression(callee)) {
          const { object = {}, property = {} } = callee

          if (object.name === objectPathName) {
            if (property.name === 'get') {
              transform(path)
            } else {
              usageOthersMethodsDef = true
            }
          }
        } else if (isImportSpec && t.isIdentifier(callee) && callee.name === objectPathGetName) {
          transform(path)
        }
      },

      ImportDeclaration(path) {
        if (path.node.source.value === 'object-path') {
          objectPath = path
          path.node.specifiers.forEach((v) => {
            if (t.isImportDefaultSpecifier(v)) {
              isImportDefault = true
              objectPathName = v.local.name
            } else if (t.isImportSpecifier(v)) {
              isImportSpec = true
              if (v.imported.name === 'get') {
                objectPathGetName = v.local.name
              } else {
                usageOthersMethodsSpec = true
              }
            }
          })
        }
      },

      Program: {
        exit(path) {
          if (objectPath) {
            if (!usageOthersMethodsDef && !isImportSpec || !usageOthersMethodsSpec && !isImportDefault) {
              objectPath.remove()
            } else if (isImportSpec) {
              const specifiers = objectPath.node.specifiers

              if (specifiers.length > 1) {
                specifiers.forEach((v, k) => {
                  if (t.isImportSpecifier(v) && v.imported.name === 'get') {
                    objectPath.get(`specifiers.${k}`).remove()
                  }
                })
              } else {
                objectPath.remove()
              }
            }
            if (objectPath.node && isImportDefault && !usageOthersMethodsDef) {
              const specifiers = objectPath.node.specifiers

              if (specifiers.length > 1) {
                specifiers.forEach((v, k) => {
                  if (t.isImportDefaultSpecifier(v) && v.local.name === objectPathName) {
                    objectPath.get(`specifiers.${k}`).remove()
                  }
                })
              } else {
                objectPath.remove()
              }
            }
          }
        }
      }
    },
  }
}
