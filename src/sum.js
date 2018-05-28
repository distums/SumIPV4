function sum(ip) {
  let total = '';
  let currentSeg = '';
  for (const char of ip) {
    if (char === '.') {
      total += to8bits(currentSeg);
      currentSeg = '';
    } else {
      currentSeg += char;
    }
  }
  total += to8bits(currentSeg);
  return parseInt(total, 2);
}

function to8bits(str) {
  return parseInt(str, 10)
    .toString(2)
    .padStart(8, '0');
}

module.exports = sum;
