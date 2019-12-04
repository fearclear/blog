import { Node } from 'tiptap'
import { toggleBlockType } from 'tiptap-commands'

export default class Heading extends Node {
  get name() {
    return 'line_height'
  }

  get schema() {
    return {
      attrs: {
        level: {
          default: 1
        }
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: [
        {
          style: 'line-height',
          getAttrs: value => /^\d+(px)?$/.test(value) && null
        }
      ],
      toDOM: node => ['p', { style: `line-height:${node.attrs.level}` }, 0]
    }
  }

  commands({ type, schema }) {
    return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
  }
}
