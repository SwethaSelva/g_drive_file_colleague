/**
 * Increment the count and keep the format 'xxx'. x donates as number
 * @param {String} numStr 
 * @returns 'xxx' + 1 = 'xxy'
 */
function driveCounter(numStr) {
  if (
    numStr.length > 3
    || Number.isNaN(+numStr)
    || +numStr > 998
  ) return numStr;

  let count = String(+numStr + 1);
  let remainingLength = 3 - count.length;
  return '0'.repeat(remainingLength) + count;
}

/**
 * Increment the count and keep the format 'ptx'. x donates as number
 * @param {String} numStr 
 * @returns 'ptx' + 1 = 'pty'
 */
function smugMugCounter(numStr) {
  if (Number.isNaN(+numStr.at(-1))) return numStr;

  let splits = numStr.split(/(\d+)/);
  if (splits.at(-1) === '') splits.pop();

  let num = splits.pop();
  return `${splits.join('')}${+num + 1}`;
}

module.exports = {
  driveCounter,
  smugMugCounter
}
