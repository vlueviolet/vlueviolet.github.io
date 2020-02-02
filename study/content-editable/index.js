const list = document.getElementById('list');
const editor = document.getElementById('editor');
document.addEventListener('selectionchange', () => this.editorEvent());
let mentionOffset;

editorEvent = e => {
  var selection = window.getSelection();
  var range = selection.getRangeAt(0);

  const r = document.getSelection().getRangeAt(0);
  const node = r.startContainer; //
  const offset = r.startOffset;
  let rect, r2;
  console.log(node);

  if (offset > 0) {
    r2 = document.createRange();
    r2.setStart(node, offset - 1);
    r2.setEnd(node, offset);
    console.log('r2', r2);
    rect = r2.getBoundingClientRect();

    mentionOffset = {
      top: `${rect.bottom}px`,
      left: `${rect.right}px`
    };

    list.style.display = 'block';
    list.style.top = mentionOffset.top;
    list.style.left = mentionOffset.left;
  }
};
