import { Mark } from 'tiptap'
import { clearFormat } from '../commands'

export default class Bold extends Mark {
  get name() {
    return 'clear_format'
  }

  get schema() {
    return {
      toDOM: () => ['strong', 0]
    }
  }

  keys({ type }) {
    return {
      'Mod-l': clearFormat(type)
    }
  }

  commands({ type }) {
    return () => clearFormat(type)
  }
}
