import _ from './util.js'

/**
 * @class Element Virtrual Dom
 * @param { String } tagName
 * @param { Object } attrs   Element's attrs, 如: { id: 'list' }
 * @param { Array <Element|String> } 可以是Element对象，也可以只是字符串，即textNode
 */
class Element {
    constructor(tagName, attrs, children) {
        // 如果只有两个参数
        if (_.isArray(attrs)) {
            children = attrs
            attrs = {}
        }

        this.tagName = tagName
        this.attrs = attrs || {}
        this.children = children
        // 设置this.key属性，为了后面list diff做准备
        this.key = attrs
            ? attrs.key
            : void 0
    }

    render() {
        let el = document.createElement(this.tagName)
        let attrs = this.attrs

        for (let attrName in attrs) { // 设置节点的DOM属性
            let attrValue = attrs[attrName]
            _.setAttr(el, attrName, attrValue)
        }

        let children = this.children || []
        children.forEach(child => {
            let childEl = child instanceof Element
                ? child.render() // 若子节点也是虚拟节点，递归进行构建
                : document.createTextNode(child)  // 若是字符串，直接构建文本节点
            el.appendChild(childEl)
        })

        return el
    }
}
function el(tagName, attrs, children) {
    return new Element(tagName, attrs, children)
}

export default el

