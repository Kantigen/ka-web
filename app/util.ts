import moment from 'moment';
import _ from 'lodash';
import $ from 'app/shims/jquery';
import constants from 'app/constants';

const xPad = function (x: any, pad: string, r?: any) {
  if (typeof r === 'undefined') {
    r = 10;
  }
  for (; parseInt(x, 10) < r && r > 1; r /= 10) {
    x = pad.toString() + x;
  }
  return x.toString();
};

export const reduceNumber = function (number: number) {
  if (number >= 100000000000000000 || number <= -100000000000000000) {
    // 101Q
    return `${Math.floor(number / 1000000000000000)}Q`;
  }
  if (number >= 1000000000000000 || number <= -1000000000000000) {
    // 75.3Q
    return `${Math.floor(number / 100000000000000) / 10}Q`;
  }
  if (number >= 100000000000000 || number <= -100000000000000) {
    // 101T
    return `${Math.floor(number / 1000000000000)}T`;
  }
  if (number >= 1000000000000 || number <= -1000000000000) {
    // 75.3T
    return `${Math.floor(number / 100000000000) / 10}T`;
  }
  if (number >= 100000000000 || number <= -100000000000) {
    // 101B
    return `${Math.floor(number / 1000000000)}B`;
  }
  if (number >= 1000000000 || number <= -1000000000) {
    // 75.3B
    return `${Math.floor(number / 100000000) / 10}B`;
  }
  if (number >= 100000000 || number <= -100000000) {
    // 101M
    return `${Math.floor(number / 1000000)}M`;
  }
  if (number >= 1000000 || number <= -1000000) {
    // 75.3M
    return `${Math.floor(number / 100000) / 10}M`;
  }
  if (number >= 10000 || number <= -10000) {
    // 123k
    return `${Math.floor(number / 1000)}k`;
  }
  // 8765
  return Math.floor(number).toString() || '0';
};

export const serverDateToDateObj = function (serverDate: string) {
  // "23 03 2010 01:20:11 +0000"
  const pieces = serverDate.split(' '); // [day month year hr:min:sec timez
  const time = pieces[3].split(':');
  const dt = new Date();

  dt.setUTCFullYear(int(pieces[2]));
  dt.setUTCMonth(int(pieces[1]) - 1, int(pieces[0]));
  dt.setUTCHours(int(time[0]));
  dt.setUTCMinutes(int(time[1]));
  dt.setUTCSeconds(int(time[2]));
  dt.setUTCMilliseconds(0);

  return dt;
};

export const serverDateToMs = function (serverDate: string) {
  return serverDateToDateObj(serverDate).getTime();
};

export const int = function (value: string | number) {
  return typeof value === 'string' ? parseInt(value, 10) : Math.trunc(value + 0);
};

export const formatTime = function (totalSeconds: number) {
  if (totalSeconds < 0) {
    return '';
  }

  const secondsInDay = 60 * 60 * 24;
  const secondsInHour = 60 * 60;
  const day = Math.floor(totalSeconds / secondsInDay);
  const hleft = totalSeconds % secondsInDay;
  const hour = Math.floor(hleft / secondsInHour);
  const sleft = hleft % secondsInHour;
  const min = Math.floor(sleft / 60);
  const seconds = Math.floor(sleft % 60);

  if (day > 0) {
    return [day, xPad(hour, '0'), xPad(min, '0'), xPad(seconds, '0')].join(':');
  }
  if (hour > 0) {
    return [hour, xPad(min, '0'), xPad(seconds, '0')].join(':');
  }
  return [min, xPad(seconds, '0')].join(':');
};

export const formatMillisecondTime = function (ms: number) {
  return formatTime(ms / 1000);
};

export const serverDateToMoment = function (str: string) {
  // There are currently two date formats being used by the server.
  // This is to handle that.

  const usingOldFormat = moment(str, constants.OLD_SERVER_DATE_FORMAT, true);
  const usingNewFormat = moment(str, constants.NEW_SERVER_DATE_FORMAT, true);

  if (usingNewFormat.isValid()) {
    return usingNewFormat;
  }
  if (usingOldFormat.isValid()) {
    return usingOldFormat;
  }
  console.error(`Cannot parse server date: ${str}`);
  return moment();
};

export const formatMomentLong = function (theMoment: moment.Moment) {
  return theMoment.format('dddd, Do MMMM HH:mm:ss ZZ');
};

export const clone = function (obj: object) {
  return $.extend(true, {}, obj);
};

export const commify = function (num: number) {
  if (num === undefined) {
    return '';
  }

  return Number(num).toLocaleString();
};

const handleString = function (string: any) {
  if (window.isNaN(string)) {
    return string;
  }
  return string * 1;
};

const handleObj = function (obj: any): any {
  if (_.isString(obj)) {
    return handleString(obj);
  }
  if (_.isObject(obj)) {
    // NOTE: isObject returns true for arrays.
    if (Array.isArray(obj)) {
      return _.map(obj, handleObj);
    }
    return _.mapValues(obj, handleObj);
  }
  return obj;
};

export const fixNumbers = function (data: any): any {
  return _.mapValues(data, handleObj);
};

export const ensureTrailingSlash = (url: string) => (url.slice(-1) === '/' ? url : `${url}/`);

export const humanize = (text: string) => {
  return _.map(text.split('_'), (str) => _.capitalize(str)).join(' ');
};

export const pluralize = (num: number, singular: string, plural: string) => {
  return num === 1 ? singular : plural;
};
