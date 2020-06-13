function patch(rootNode, patches) {
    let walker = { index: 0 }
    walk(rootNode, walker, patches)
}

function walk(node, walker, patches) {
    let currentPatches = patches[walker.index] // 从patches取出当前节点的差异

    let len = node.childNodes
        ? node.childNodes.length
        : 0
    for (let i = 0; i < len; i++) { // 深度遍历子节点
        let child = node.childNodes[i]
        walker.index++
        walk(child, walker, patches)
    }

    if (currentPatches) {
        dealPatches(node, currentPatches)  // 对当前节点进行DOM操作
    }
}

function dealPatches(node, currentPatches) {
    currentPatches.forEach(currentPatch => {
        switch (currentPatch.type) {
            case REPLACE:
                let newNode = (typeof currentPatch.node === 'string')
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render()
                node.parentNode.replaceChild(newNode, node)
                break
            case REORDER:
                reorderChildren(node, currentPatch.moves)
                break
            case ATTRS:
                setProps(node, currentPatch.props)
                break
            case TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content
                } else {
                    // for ie
                    node.nodeValue = currentPatch.content
                }
                break
            default:
                throw new Error('Unknown patch type ' + currentPatch.type)
        }
    })
}

function setAttrs(node, props) {
    for (let key in props) {
        if (props[key] === void 0) {
            node.removeAttribute(key)
        } else {
            let value = props[key]
            _.setAttr(node, key, value)
        }
    }
}
function reorderChildren(node, moves) {
    let staticNodeList = _.toArray(node.childNodes)
    let maps = {} // 存储含有key特殊字段的节点

    staticNodeList.forEach(node => {
        // 如果当前节点是ElementNode，通过maps将含有key字段的节点进行存储
        if (_.isElementNode(node)) {
            let key = node.getAttribute('key')
            if (key) {
                maps[key] = node
            }
        }
    })

    moves.forEach(move => {
        let index = move.index
        if (move.type === 0) { // remove item
            if (staticNodeList[index] === node.childNodes[index]) { // maybe have been removed for inserting
                node.removeChild(node.childNodes[index])
            }
            staticNodeList.splice(index, 1)
        } else if (move.type === 1) { // insert item
            let insertNode = maps[move.item.key]
                ? maps[move.item.key] // reuse old item
                : (typeof move.item === 'object')
                    ? move.item.render()
                    : document.createTextNode(move.item)
            staticNodeList.splice(index, 0, insertNode)
            node.insertBefore(insertNode, node.childNodes[index] || null)
        }
    })
}
