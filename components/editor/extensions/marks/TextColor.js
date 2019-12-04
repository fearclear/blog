import { Mark } from 'tiptap'
import { toggleMark } from '../commands'

export default class FontSize extends Mark {
  get name() {
    return 'text_color'
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: '#515a6e'
        },
        backgroundColor: {
          default: '#f5f7f9'
        }
      },
      draggable: false,
      parseDOM: [
        {
          style: 'color',
          getAttrs: value => /^\d+(px|em)$/.test(value) && null
        },
        {
          style: 'background',
          getAttrs: value => /^(#|rgb|rgba)/.test(value) && null
        },
        {
          style: 'backgorund-color',
          getAttrs: value => /^(#|rgb|rgba)/.test(value) && null
        }
      ],
      toDOM: mark => ['span', { style: `color:${mark.attrs.color};background-color:${mark.attrs.backgroundColor}` }, 0]
    }
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs)
  }
}
