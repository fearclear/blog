import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class FontSize extends Mark {
  get name() {
    return 'super_script'
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 'sup'
        },
        {
          style: 'vertical-align',
          getAttrs: value => /^super$/.test(value) && null
        }
      ],
      toDOM: () => ['sup', 0]
    }
  }

  commands({ type }) {
    return () => toggleMark(type)
  }
}
