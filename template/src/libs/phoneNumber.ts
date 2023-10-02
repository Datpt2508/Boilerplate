import countryData, { countryCodes } from '~/libs/countryPicker';

import libPhoneNumber from 'google-libphonenumber';

const AsYouTypeFormatter = libPhoneNumber.AsYouTypeFormatter;

const isNumeric = (n: string) =>
  !Number.isNaN(parseFloat(n)) && Number.isFinite(Number(n));

const getNumeric = (str: string) => str.replace(/\D/g, '');

export const format = (number: string, iso2: string) => {
  const formatter = new AsYouTypeFormatter(iso2);

  let formatted;

  number
    .replace(/-/g, '')
    .replace(/ /g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .split('')
    .forEach((n) => {
      formatted = formatter.inputDigit(n);
    });

  return formatted;
};

export const getDialCode = (number: string) => {
  let dialCode = '';

  // only interested in international numbers (starting with a plus)
  if (number.charAt(0) === '+') {
    let numericChars = '';

    // iterate over chars
    for (let i = 0; i < number.length; i++) {
      const c = number.charAt(i);

      // if char is number
      if (isNumeric(c)) {
        numericChars += c;

        // if current numericChars make a valid dial code
        // if (this.countryCodes[numericChars]) {
        if (countryCodes[numericChars]) {
          // store the actual raw string (useful for matching later)
          dialCode = number.substr(0, i + 1);
        }

        // longest dial code is 4 chars
        if (numericChars.length === 4) {
          break;
        }
      }
    }
  }
  return dialCode;
};

export const getCountryCodeOfNumber = (number: string) => {
  const dialCode = getDialCode(number);
  const numeric = getNumeric(dialCode);
  const countryCode = countryCodes[numeric];

  // countryCode[0] can be null -> get first element that is not null
  if (countryCode) {
    return countryCode.find(Boolean);
  }

  return '';
};

export const getCountryDataByCode = (iso2: string) => {
  return countryData.find((c) => c.iso2 === iso2);
};
