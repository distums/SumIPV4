function sum(ip) {
  let total = '';
  let currentSeg = '';
  for (const char of ip) {
    if (char === '.') {
      total += toByte(currentSeg);
      currentSeg = '';
    } else {
      currentSeg += char;
    }
  }
  total += toByte(currentSeg);
  return parseInt(total, 2);
}

function toByte(str) {
  return parseInt(str, 10)
    .toString(2)
    .padStart(8, '0');
}

function toBinary(num, arr = []) {
  if (num < 2) {
    arr.push(num);
    return arr.reverse.join('');
  }
  const devider = num / 2;
  const remain = num % 2;
  arr.push(remain);
  return toBinary(num, arr);
}

module.exports = sum;
