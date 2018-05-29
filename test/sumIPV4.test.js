const sum = require('../src/sum');

test('sum `172.168.5.1` to equal `2896692481` and every 8 bit should have correct value', () => {
  const result = sum('172.168.5.1');
  expect(result).toBe(2896692481);
  const binaryStr = result.toString(2);
  expect(binaryStr.slice(0, 8)).toBe('10101100'); // highest order 8 bit
  expect(binaryStr.slice(8, 16)).toBe('10101000'); // second highest order 8 bit
  expect(binaryStr.slice(16, 24)).toBe('00000101'); // second lowest order 8 bit
  expect(binaryStr.slice(24)).toBe('00000001'); // lowest order 8 bit
});

test('sum ` 172  . 168.5 .1 ` which contains valid spaces to equal `2896692481` and  every 8 bit should have correct value', () => {
  const result = sum(' 172  . 168.5 .1 ');
  expect(result).toBe(2896692481);
  const binaryStr = result.toString(2);
  expect(binaryStr.slice(0, 8)).toBe('10101100'); // highest order 8 bit
  expect(binaryStr.slice(8, 16)).toBe('10101000'); // second highest order 8 bit
  expect(binaryStr.slice(16, 24)).toBe('00000101'); // second lowest order 8 bit
  expect(binaryStr.slice(24)).toBe('00000001'); // lowest order 8 bit
});

// test('sum `17 2.168.5.1 ` which contains spaces between two digits should throw error', () => {
//   expect(sum('17 2.168.5.1')).toThrow();
// });

// test('sum an invalid ip address `172.168.5` should throw error', () => {
//   expect(sum('172.168.5')).toThrow();
// });

// test('sum an invalid ip address `256.168.5.1` should throw error', () => {
//   expect(sum('17 2.168.5.1')).toThrow();
// });
