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

test('sum `172.16 8.5.1 ` which contains spaces between two digits should throw error', () => {
  expect(() => {
    sum('172.16 8.5.1');
  }).toThrow('spaces between two digits');
});

test('sum an invalid ip address `172.168.5` should throw error', () => {
  expect(() => {
    sum('172.168.5');
  }).toThrow('invalid ip address');
});

test('sum an invalid ip address `.172.168.5` should throw error', () => {
  expect(() => {
    sum('.172.168.5.');
  }).toThrow('invalid ip address');
});

test('sum an invalid ip address `256.168.5.1` should throw error', () => {
  expect(() => {
    sum('256.168.5.1');
  }).toThrow('invalid ip address');
});

test('sum an invalid ip address `178.-168.5.1` should throw error', () => {
  expect(() => {
    sum('178.-168.5.1');
  }).toThrow('contains invalid character');
});

test('sum an invalid ip address `178` should throw error', () => {
  expect(() => {
    sum('178');
  }).toThrow('invalid ip address');
});

test('providing invalid arguments to `sum` should throw error', () => {
  expect(() => {
    sum();
  }).toThrow('invalid arguments');
  expect(() => {
    sum(null);
  }).toThrow('invalid arguments');
  expect(() => {
    sum(172);
  }).toThrow('invalid arguments');
  expect(() => {
    sum({});
  }).toThrow('invalid arguments');
});

test('sum random generated ip string should have correct result', () => {
  const ips = [
    randomByteNum(),
    randomByteNum(),
    randomByteNum(),
    randomByteNum(),
  ];
  const ip = ips.join('.');
  const result = sum(ip);
  expect(result).toBe(
    ips[0] * 2 ** 24 + ips[1] * 2 ** 16 + ips[2] * 2 ** 8 + ips[3]
  );
  const binaryStr = result.toString(2).padStart(32, '0');
  expect(binaryStr.slice(0, 8)).toBe(ips[0].toString(2).padStart(8, '0')); // highest order 8 bit
  expect(binaryStr.slice(8, 16)).toBe(ips[1].toString(2).padStart(8, '0')); // second highest order 8 bit
  expect(binaryStr.slice(16, 24)).toBe(ips[2].toString(2).padStart(8, '0')); // second lowest order 8 bit
  expect(binaryStr.slice(24)).toBe(ips[3].toString(2).padStart(8, '0')); // lowest order 8 bit
});

function randomByteNum() {
  const r = Math.random();
  return Math.floor(r * 256);
}
