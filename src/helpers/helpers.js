import _ from 'lodash';

export function convertCamelCaseToSpaces(str) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function toCamelCase(inputString) {
  // Split the inputString into an array of words
  const words = inputString.trim().split(/\s+/);

  // Convert the first word to lowercase and the rest to uppercase
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  // Join the words back into a single string
  const camelCaseString = camelCaseWords.join('');

  return camelCaseString;
}

export function formatPhoneNumber(phoneNumber) {
  let formattedNumber = phoneNumber;
  if (phoneNumber.length === 10) {
    formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return formattedNumber;
}

export function capitalizeWords(str) {
  // Split the string into an array of words
  const words = str.split(' ');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });

  // Join the capitalized words back into a string
  const capitalizedString = capitalizedWords.join(' ');

  return capitalizedString;
}

export function isLink(text) {
  const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
  return urlRegex.test(text);
}

export function arrayToMap(array) {
  const mapResult = {};
  array.forEach((item) => {
    mapResult[item.name] = item;
  });
  return mapResult;
}

export function formatLeadData(leadData) {
  return {
    title: leadData.title,
    stage: leadData.stage,
    name: leadData.name,
    phone: leadData.phone,
    email: leadData.email,
    website: leadData.website,
    facebook: leadData.facebook,
    linkedin: leadData.linkedin,
    otherLink: leadData.otherLink,
    companyName: leadData.companyName,
    companyPhone: leadData.companyPhone,
    companyEmail: leadData.companyEmail,
    companyWebsite: leadData.companyWebsite,
    companyFacebook: leadData.companyFacebook,
    companyLinkedin: leadData.companyLinkedin,
    companyOtherLink: leadData.companyOtherLink,
    dateCreated: leadData.dateCreated,
    notes: leadData.notes,
    id: leadData.id,
  };
}

export function countNestedObjects(obj) {
  let count = 0;

  _.forIn(obj, (value) => {
    if (_.isPlainObject(value)) {
      count++; // Increment count if the property is a plain object
      count += countNestedObjects(value); // Continue recursively to check nested objects within this property
    }
  });

  return count;
}

export function hasNoLetters(str) {
  // Regular expression to check for any letter characters
  const letterRegex = /[A-Za-z]/;

  // Use test() method to check if the string contains any letter characters
  return !letterRegex.test(str);
}

export function removeAfterAtSymbol(str) {
  const atIndex = str.indexOf('@');
  if (atIndex !== -1) {
    return str.substring(0, atIndex);
  }
  return str;
}
