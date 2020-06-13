/**
 * Diff two list in O(N).
 * @param {Array} oldList - 原始列表
 * @param {Array} newList - 经过一些操作的得出的新列表
 * @return {Object} - {moves: <Array>}
 *                  - moves list操作记录的集合
 */
function listDiff(oldList, newList, key) {
    let oldMap = getKeyIndexAndFree(oldList, key)
    let newMap = getKeyIndexAndFree(newList, key)

    let newFree = newMap.free

    let oldKeyIndex = oldMap.keyIndex
    let newKeyIndex = newMap.keyIndex
    // 记录所有move操作
    let moves = []

    // a simulate list
    let children = []
    let i = 0
    let item
    let itemKey
    let freeIndex = 0

    // newList 向 oldList 的形式靠近进行操作
    while (i < oldList.length) {
        item = oldList[i]
        itemKey = getItemKey(item, key)
        if (itemKey) {
            if (!newKeyIndex.hasOwnProperty(itemKey)) {
                children.push(null)
            } else {
                let newItemIndex = newKeyIndex[itemKey]
                children.push(newList[newItemIndex])
            }
        } else {
            let freeItem = newFree[freeIndex++]
            children.push(freeItem || null)
        }
        i++
    }
    let simulateList = children.slice(0)

    // 移除列表中一些不存在的元素
    i = 0
    while (i < simulateList.length) {
        if (simulateList[i] === null) {
            remove(i)
            removeSimulate(i)
        } else {
            i++
        }
    }
    // i  => new list
    // j  => simulateList
    let j = i = 0
    while (i < newList.length) {
        item = newList[i]
        itemKey = getItemKey(item, key)

        let simulateItem = simulateList[j]
        let simulateItemKey = getItemKey(simulateItem, key)

        if (simulateItem) {
            if (itemKey === simulateItemKey) {
                j++
            }
            else {
                // 如果移除掉当前的 simulateItem 可以让 item在一个正确的位置，那么直接移除
                let nextItemKey = getItemKey(simulateList[j + 1], key)
                if (nextItemKey === itemKey) {
                    remove(i)
                    removeSimulate(j)
                    j++ // 移除后，当前j的值是正确的，直接自加进入下一循环
                } else {
                    // 否则直接将item 执行 insert
                    insert(i, item)
                }
            }
            // 如果是新的 item, 直接执行 inesrt
        } else {
            insert(i, item)
        }
        i++
    }
    // if j is not remove to the end, remove all the rest item
    // let k = 0;
    // while (j++ < simulateList.length) {
    //   remove(k + i);
    //   k++;
    // }

    // 记录remove操作
    function remove(index) {
        let move = { index: index, type: 0 }
        moves.push(move)
    }
    // 记录insert操作
    function insert(index, item) {
        let move = { index: index, item: item, type: 1 }
        moves.push(move)
    }
    // 移除simulateList中对应实际list中remove掉节点的元素
    function removeSimulate(index) {
        simulateList.splice(index, 1)
    }
    // 返回所有操作记录
    return {
        moves: moves,
        children: children
    }
}
/**
 * 将 list转变成  key-item keyIndex 对象的形式进行展示.
 * @param {Array} list
 * @param {String|Function} key
 */
function getKeyIndexAndFree(list, key) {
    let keyIndex = {}
    let free = []
    for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        let itemKey = getItemKey(item, key)
        if (itemKey) {
            keyIndex[itemKey] = i
        } else {
            free.push(item)
        }
    }

    // 返回 key-item keyIndex
    return {
        keyIndex: keyIndex,
        free: free
    }
}

function getItemKey(item, key) {
    if (!item || !key) return void 0
    return typeof key === 'string'
        ? item[key]
        : key(item)
}

export default listDiff

