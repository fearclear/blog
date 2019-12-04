import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class FontSize extends Mark {
  get name() {
    return 'sub_script'
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 'sub'
        },
        {
          style: 'vertical-align',
          getAttrs: value => /^sub$/.test(value) && null
        }
      ],
      toDOM: () => ['sub', 0]
    }
  }

  commands({ type }) {
    return () => toggleMark(type)
  }
}
