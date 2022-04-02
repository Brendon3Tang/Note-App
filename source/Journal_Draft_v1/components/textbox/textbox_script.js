const editor = new EditorJS({
  holder: 'editorjs',
  minHeight: 0,
  /**
   * Available Tools list.
   * Pass Tool's class or Settings object for each Tool you want to use
   */
  tools: {
    header: Header,
    delimiter: Delimiter,
    paragraph: {
      config: {
        placeholder: '\u2192Click Here To Add Text\u2190'
      },
      class: Paragraph,
      inlineToolbar: true
    },
    embed: Embed,
    image: SimpleImage,
    list: {
      class: List,
      inlineToolbar: true
    },
    quote: Quote
  },
  data: {}
})
var flag = 0
function getData () {
  return editor.save()
}

async function setData (data) {
  try {
    if (data.blocks.length) {
      await editor.isReady
      editor.render(data)
    }
  } catch (reason) {
    console.log(`Editor.js initialization failed because of ${reason}`)
  }
}
