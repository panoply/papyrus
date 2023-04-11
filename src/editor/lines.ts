/**
 * Returns the number of newline occurances
 */
export function getLineCount (code: string) {

  return code.split('\n').length;

}

/**
 * Returns the newline counter node
 */
export function getLineNumbers (count: number) {

  let lines = '';

  for (let i = 0; i < count; i++) {
    lines += `<span class="ln" data-line="${i + 1}"></span>`;
  }

  return `<span class="line-numbers">${lines}</span>`;

}
