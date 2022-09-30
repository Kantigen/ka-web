import * as util from 'app/util';

test('util.reduceNumber', () => {
  expect(util.reduceNumber(1)).toBe('1');
  expect(util.reduceNumber(10)).toBe('10');
  expect(util.reduceNumber(100)).toBe('100');
  expect(util.reduceNumber(1000)).toBe('1000');
  expect(util.reduceNumber(10000)).toBe('10k');
  expect(util.reduceNumber(100000)).toBe('100k');
  expect(util.reduceNumber(1000000)).toBe('1M');
  expect(util.reduceNumber(10000000)).toBe('10M');
  expect(util.reduceNumber(100000000)).toBe('100M');
  expect(util.reduceNumber(1000000000)).toBe('1B');
  expect(util.reduceNumber(10000000000)).toBe('10B');
  expect(util.reduceNumber(100000000000)).toBe('100B');
  expect(util.reduceNumber(1000000000000)).toBe('1T');
  expect(util.reduceNumber(10000000000000)).toBe('10T');
  expect(util.reduceNumber(100000000000000)).toBe('100T');
  expect(util.reduceNumber(1000000000000000)).toBe('1Q');
  expect(util.reduceNumber(10000000000000000)).toBe('10Q');
  expect(util.reduceNumber(100000000000000000)).toBe('100Q');
});

test('util.serverDateToMs', () => {
  expect(util.serverDateToMs('23 03 2010 01:20:11 +0000')).toBe(1269307211000);
  expect(util.serverDateToMs('01 01 1970 00:00:00 +0000')).toBe(0);
});

test('util.int', () => {
  expect(util.int('1')).toBe(1);
  expect(util.int('1.0')).toBe(1);
  expect(util.int('1.0sdfsl')).toBe(1);
  expect(util.int(1.111111)).toBe(1);
});

test('util.formatTime', () => {
  expect(util.formatTime(60)).toBe('1:00');
  expect(util.formatTime(120)).toBe('2:00');
  expect(util.formatTime(600)).toBe('10:00');
  expect(util.formatTime(3600)).toBe('1:00:00');
  expect(util.formatTime(9000)).toBe('2:30:00');
  expect(util.formatTime(18060)).toBe('5:01:00');
  expect(util.formatTime(18627)).toBe('5:10:27');
  expect(util.formatTime(86399)).toBe('23:59:59');
  expect(util.formatTime(86401)).toBe('1:00:00:01');
  expect(util.formatTime(864001)).toBe('10:00:00:01');
});

test('util.formatMillisecondTime', () => {
  expect(util.formatMillisecondTime(60 * 1000)).toBe('1:00');
});

test('util.serverDateToMoment', () => {
  expect(util.serverDateToMoment('2022 05 16 11:06:51 +0000')?.valueOf()).toBe(1652699211000);
  expect(util.serverDateToMoment('16 05 2022 11:06:51 +0000')?.valueOf()).toBe(1652699211000);
});

test('util.commify', () => {
  expect(util.commify(1)).toBe('1');
  expect(util.commify(10)).toBe('10');
  expect(util.commify(100)).toBe('100');
  expect(util.commify(1000)).toBe('1,000');
  expect(util.commify(10000)).toBe('10,000');
  expect(util.commify(100000)).toBe('100,000');
  expect(util.commify(1000000)).toBe('1,000,000');
  expect(util.commify(10000000)).toBe('10,000,000');
  expect(util.commify(100000000)).toBe('100,000,000');
  expect(util.commify(1000000000)).toBe('1,000,000,000');
});

test('util.fixNumbers', () => {
  expect(util.fixNumbers({ foo: 100 })).toStrictEqual({ foo: 100 });
  expect(util.fixNumbers({ foo: '100' })).toStrictEqual({ foo: 100 });
  expect(util.fixNumbers({ foo: '1.0' })).toStrictEqual({ foo: 1.0 });
  expect(util.fixNumbers({ foo: '1.1' })).toStrictEqual({ foo: 1.1 });
  expect(util.fixNumbers({ foo: '1.1.1' })).toStrictEqual({ foo: '1.1.1' });
  expect(util.fixNumbers({ foo: { bar: 100 } })).toStrictEqual({ foo: { bar: 100 } });
  expect(util.fixNumbers({ foo: { bar: '100' } })).toStrictEqual({ foo: { bar: 100 } });
  expect(util.fixNumbers({ foo: { bar: '1.0' } })).toStrictEqual({ foo: { bar: 1.0 } });
  expect(util.fixNumbers({ foo: { bar: '1.1' } })).toStrictEqual({ foo: { bar: 1.1 } });
  expect(util.fixNumbers({ foo: { bar: '1.1.1' } })).toStrictEqual({ foo: { bar: '1.1.1' } });
  expect(util.fixNumbers({ foo: [{ bar: 100 }] })).toStrictEqual({ foo: [{ bar: 100 }] });
  expect(util.fixNumbers({ foo: [{ bar: '100' }] })).toStrictEqual({ foo: [{ bar: 100 }] });
  expect(util.fixNumbers({ foo: [{ bar: '1.0' }] })).toStrictEqual({ foo: [{ bar: 1.0 }] });
  expect(util.fixNumbers({ foo: [{ bar: '1.1' }] })).toStrictEqual({ foo: [{ bar: 1.1 }] });
  expect(util.fixNumbers({ foo: [{ bar: '1.1.1' }] })).toStrictEqual({ foo: [{ bar: '1.1.1' }] });
});

test('util.ensureTrailingSlash', () => {
  expect(util.ensureTrailingSlash('')).toBe('/');
  expect(util.ensureTrailingSlash('/')).toBe('/');
  expect(util.ensureTrailingSlash('//')).toBe('//');
  expect(util.ensureTrailingSlash('///')).toBe('///');
});

test('util.pluralize', () => {
  expect(util.pluralize(0, 'pig', 'pigs')).toBe('pigs');
  expect(util.pluralize(1, 'pig', 'pigs')).toBe('pig');
  expect(util.pluralize(2, 'pig', 'pigs')).toBe('pigs');
  expect(util.pluralize(3, 'pig', 'pigs')).toBe('pigs');
  expect(util.pluralize(4, 'pig', 'pigs')).toBe('pigs');
  expect(util.pluralize(5, 'pig', 'pigs')).toBe('pigs');
});
