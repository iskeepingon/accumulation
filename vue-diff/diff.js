import el from './element.js'
import _ from './util.js'
import listDiff from './list-diff.js'

const REPLACE = 0
const ATTRS = 1
const TEXT = 2
const REORDER = 3

// diff 入口，比较新旧两棵树的差异
function diff(oldTree, newTree) {
    let index = 0
    let patches = {} // 用来记录每个节点差异的补丁对象
    walk(oldTree, newTree, index, patches)
    return patches
}

/**
 * walk 遍历查找节点差异
 * @param  { Object } oldNode
 * @param  { Object } newNode
 * @param  { Number } index   - currentNodeIndex
 * @param  { Object } patches - 记录节点差异的对象
 */
function walk(oldNode, newNode, index, patches) {

    let currentPatch = []

    // 如果oldNode被remove掉了，即 newNode === null的时候
    if (newNode === null || newNode === undefined) {
        // 先不做操作, 具体交给 list diff 处理
    }
    // 比较文本之间的不同
    else if (_.isString(oldNode) && _.isString(newNode)) {
        if (newNode !== oldNode) currentPatch.push({ type: TEXT, content: newNode })
    }
    // 比较attrs的不同
    else if (
        oldNode.tagName === newNode.tagName &&
        oldNode.key === newNode.key
    ) {
        let attrsPatches = diffAttrs(oldNode, newNode)
        if (attrsPatches) {
            currentPatch.push({ type: ATTRS, attrs: attrsPatches })
        }
        // 递归进行子节点的diff比较
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
    }
    else {
        currentPatch.push({ type: REPLACE, node: newNode })
    }

    if (currentPatch.length) {
        patches[index] = currentPatch
    }
}

function diffAttrs(oldNode, newNode) {
    let count = 0
    let oldAttrs = oldNode.attrs
    let newAttrs = newNode.attrs

    let key, value
    let attrsPatches = {}

    // 如果存在不同的 attrs
    for (key in oldAttrs) {
        value = oldAttrs[key]
        // 如果 oldAttrs 移除掉一些 attrs, newAttrs[key] === undefined
        if (newAttrs[key] !== value) {
            count++
            attrsPatches[key] = newAttrs[key]
        }
    }
    // 如果存在新的 attr
    for (key in newAttrs) {
        value = newAttrs[key]
        if (!oldAttrs.hasOwnProperty(key)) {
            attrsPatches[key] = value
        }
    }

    if (count === 0) {
        return null
    }

    return attrsPatches
}

// 设置节点唯一标识
let key_id = 0
// diff with children
function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    let diffs = listDiff(oldChildren, newChildren, 'key')
    newChildren = diffs.children

    if (diffs.moves.length) {
        let reorderPatch = { type: REORDER, moves: diffs.moves }
        currentPatch.push(reorderPatch)
    }

    // 存放当前node的标识，初始化值为 0
    let currentNodeIndex = index

    oldChildren.forEach((child, i) => {
        key_id++
        let newChild = newChildren[i]
        currentNodeIndex = key_id

        // 递归继续比较
        walk(child, newChild, currentNodeIndex, patches)
    })
}

let ul = el('ul', { id: 'list' }, [
    el('li', { class: 'item' }, ['Item 1']),
    el('li', { class: 'item' }, ['Item 2'])
])
let ul1 = el('ul', { id: 'list1' }, [
    el('li', { class: 'item1' }, ['Item 4']),
    el('li', { class: 'item2' }, ['Item 5'])
])
let patches = diff(ul, ul1)
console.log(patches)