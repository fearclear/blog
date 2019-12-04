/* eslint-disable */
import { Node } from 'tiptap'
import { toggleBlockType } from 'tiptap-commands'

export default class TextAlign extends Node {
  get name() {
    return 'text_align'
  }

  get schema() {
    return {
      attrs: {
        level: {
          default: 'left'
        }
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: [
        {
          style: 'text-align',
          getAttrs: value => /^(left|center|right|justify)$/.test(value) && null
        }
      ],
      toDOM: node => ['p', { style: `text-align:${node.attrs.level}` }, 0]
    }
  }

  commands({ type, schema }) {
    return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
  }
}
