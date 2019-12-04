import { Mark } from 'tiptap'
import { toggleMark } from '../commands'

export default class FontSize extends Mark {
  get name() {
    return 'font_size'
  }

  get schema() {
    return {
      attrs: {
        level: {
          default: 16
        }
      },
      draggable: false,
      parseDOM: [
        {
          style: 'font-size',
          getAttrs: value => /^\d+(px|em)$/.test(value) && null
        }
      ],
      toDOM: mark => ['span', { style: `font-size:${mark.attrs.level}px` }, 0]
    }
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs)
  }
}
