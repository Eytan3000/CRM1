import _ from 'lodash';

export function convertCamelCaseToSpaces(str) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
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

  // return {
  //   title: leadData.title,
  //   stage: leadData.stage,
  //   name: leadData.name,
  //   phone: leadData.phone,
  //   email: leadData.email,
  //   website: leadData.website,
  //   facebook: leadData.facebook,
  //   linkedin: leadData.linkedin,
  //   otherLink: leadData.otherLink,
  //   company: {
  //     name: leadData.companyName,
  //     phone: leadData.companyPhone,
  //     email: leadData.companyEmail,
  //     website: leadData.companyWebsite,
  //     facebook: leadData.companyFacebook,
  //     linkedin: leadData.companyLinkedin,
  //     otherLink: leadData.companyOtherLink,
  //   },
  //   dateCreated: leadData.dateCreated,
  //   id: leadData.id,
  // };

  // _.forEach(rearrangedLead, (data, key) => {
  //   console.log(`${key}:${data}`);
  // });
}
