import { insert } from 'text-field-edit';

/**
 * Keydown Event
 *
 * Callback function for `onkeydown` within the textarea element.
 * Preserves newline indentation and respect history stack.
 */
export function onkeydown (this: HTMLTextAreaElement, event: KeyboardEvent) {

  if (event.key === 'Enter') {

    if (event.altKey || event.ctrlKey) return;
    event.preventDefault(); // We will add newline ourselves.

    const start = this.selectionStart;
    const line = this.value.slice(0, start).split('\n').pop();
    const newline = '\n' + line.match(/^\s*/)[0];
    document.execCommand('insertText', false, newline);

  } else {

    const reverse = (step: number) => (this.selectionEnd = this.selectionEnd - step);

    switch (event.key) {
      case '{':
        insert(this, '}');
        reverse(1);
        break;
      case '[':
        insert(this, ']');
        reverse(1);
        break;
      case '"':
        insert(this, '"');
        reverse(1);
        break;
      case "'":
        insert(this, "'");
        reverse(1);
        break;
    }

  }
}
