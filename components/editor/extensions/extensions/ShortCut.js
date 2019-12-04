import { Extension } from 'tiptap'
import { insertTab } from '../commands'

export default class History extends Extension {
  get name() {
    return 'history'
  }

  get defaultOptions() {
    return {
      depth: '',
      newGroupDelay: ''
    }
  }

  keys() {
    const keymap = {
      'Tab': insertTab('  ')
    }

    return keymap
  }

  get plugins() {
    return [
      // history({
      //   depth: this.options.depth,
      //   newGroupDelay: this.options.newGroupDelay
      // })
    ]
  }

  commands() {
    return {
      // undo: () => undo,
    }
  }
}
