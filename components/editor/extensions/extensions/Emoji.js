import { Extension } from 'tiptap'
import { insertText } from 'tiptap-commands'

export default class Emoji extends Extension {
  get name() {
    return 'emoji'
  }

  commands({ type, schema }) {
    return {
      emoji: emoji => insertText(emoji)
    }
  }
}
