const list = document.getElementById('list');
const editor = document.getElementById('editor');
document.addEventListener('selectionstart', () => this.editorEvent());
let mentionOffset;

editorEvent = e => {
  // var selection = window.getSelection();
  // var range = selection.getRangeAt(0);

  const r = document.getSelection().getRangeAt(0); // range 인스턴스
  console.log(r);
  const node = r.startContainer; //
  const offset = r.startOffset;
  let rect, r2;

  if (offset > 0) {
    console.log(r);
    r2 = document.createRange();
    r2.setStart(node, offset - 1);
    r2.setEnd(node, offset);
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
