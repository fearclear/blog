import { TextSelection } from 'tiptap'

import { minMax } from './utils'

export default function(text = '') {
  return (state, dispatch) => {
    const { selection, tr } = state
    const { $from, from, to } = selection
    const { pos } = $from
    const span = document.createElement('span')
    span.innerHTML = 'span'
    const fragment = document.createDocumentFragment()
    fragment.append(span)
    tr.insertText(text, pos, pos)
    const newState = state.apply(tr)
    const { doc } = newState
    const resolvedFrom = minMax(from + 2, 0, doc.content.size)
    const resolvedEnd = minMax(to + 2, 0, doc.content.size)
    const nowSelection = TextSelection.create(doc, resolvedFrom, resolvedEnd)
    const transaction = tr.setSelection(nowSelection)
    dispatch(transaction)

    return false
  }
}
