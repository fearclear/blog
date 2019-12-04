import { Mark } from 'tiptap'
import { toggleMark } from '../commands'

export default class FontSize extends Mark {
  get name() {
    return 'letter_spacing'
  }

  get schema() {
    return {
      attrs: {
        level: {
          default: 0
        }
      },
      draggable: false,
      parseDOM: [
        {
          style: 'letter-spacing',
          getAttrs: value => /^\d+(px|em)$/.test(value) && null
        }
      ],
      toDOM: mark => ['span', { style: `letter-spacing:${mark.attrs.level}px` }, 0]
    }
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs)
  }
}
