import * as R from 'ramda'
import * as copyToClipboard from 'copy-to-clipboard'

const types = {
  image: ({ srcUrl }) => `![](${srcUrl})`,
  link: ({ selectionText = 'unknown', linkUrl }) => `[${selectionText}](${linkUrl})`,
}

const copyAsMarkdown = ({ mediaType = 'link', ...rest }) =>
  R.pipe(R.prop(R.__, types), R.applyTo(rest), copyToClipboard)(mediaType)

chrome.contextMenus.create({
  title: 'Copy as Markdown',
  contexts: ['link', 'image'],
  onclick: copyAsMarkdown,
})
