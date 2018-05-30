const assert = require('assert');

function sum(ip) {
  assert.strictEqual(typeof ip, 'string', 'invalid arguments');
  const parts = parse(ip);
  return parseInt(parts.map(toByte).join(''), '2');
}

/**
 * parse an ip address string to an array with four elements
 * eg. '172.168.5.1' => [172,168,5,1]
 * @param {string} ip ip address string
 * @returns {Array}
 */
function parse(ip) {
  let parts = [];
  let currentSeg = '';
  let containsSpaceAfterDigit = false;
  for (const char of ip) {
    if (char >= '0' && char <= '9') {
      if (containsSpaceAfterDigit)
        throw new Error('spaces between two digits is invalid');
      currentSeg += char;
    } else if (char === '.') {
      parts.push(convertToNumber(currentSeg));
      currentSeg = '';
      containsSpaceAfterDigit = false;
    } else if (char === ' ') {
      if (currentSeg.length > 0) {
        containsSpaceAfterDigit = true;
      }
    } else {
      throw new Error('ip address string contains invalid character');
    }
  }
  if (currentSeg) {
    parts.push(convertToNumber(currentSeg));
  }
  if (parts.length !== 4) {
    throw new Error('invalid ip address');
  }
  return parts;
}

function toByte(num) {
  return toBinary(num).padStart(8, '0');
}

function convertToNumber(part) {
  const num = parseInt(part, 10);
  if (isNaN(num) || num > 255) throw new Error('invalid ip address');
  return num;
}

/**
 * convert decimal to binary
 * @param {number} num decimal number
 * @param {array} arr temp array
 * @returns {string} binary representation of input num
 */
function toBinary(num, arr = []) {
  if (num < 2) {
    arr.push(num);
    return arr.reverse().join('');
  }
  const quotient = Math.floor(num / 2);
  const remainder = num % 2;
  arr.push(remainder);
  return toBinary(quotient, arr);
}

module.exports = sum;
