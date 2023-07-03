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
