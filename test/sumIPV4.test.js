const sum = require('../src/sum');

test('sum `172.168.5.1` to equal `2896692481`', () => {
  expect(sum('172.168.5.1')).toBe(2896692481);
});

test('every 8 bit of sum `172.168.5.1` shoud have correct value', () => {
  const result = sum('172.168.5.1');
  const binaryStr = result.toString(2);
  expect(binaryStr.slice(0, 8)).toBe('10101100'); // highest order 8 bit
  expect(binaryStr.slice(8, 16)).toBe('10101000'); // second highest order 8 bit
  expect(binaryStr.slice(16, 24)).toBe('00000101'); // second lowest order 8 bit
  expect(binaryStr.slice(24)).toBe('00000001'); // lowest order 8 bit
});

test('sum ` 172  . 168.5 .1 ` which contains valid spaces to equal `2896692481`', () => {
  expect(sum(' 172  . 168.5 .1 ')).toBe(2896692481);
});

test('every 8 bit of sum ` 172  . 168.5 .1 ` which contains valid spaces shoud have correct value', () => {
  const result = sum(' 172  . 168.5 .1 ');
  const binaryStr = result.toString(2);
  expect(binaryStr.slice(0, 8)).toBe('10101100'); // highest order 8 bit
  expect(binaryStr.slice(8, 16)).toBe('10101000'); // second highest order 8 bit
  expect(binaryStr.slice(16, 24)).toBe('00000101'); // second lowest order 8 bit
  expect(binaryStr.slice(24)).toBe('00000001'); // lowest order 8 bit
});

test('sum `17 2.168.5.1 ` which contains spaces between two digits should throw error', () => {
  console.log(sum('17 2.168.5.1'));
  expect(sum('17 2.168.5.1')).toThrow();
});
