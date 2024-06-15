export const removeDuplicates = (originalArray: any[], key: string) => {
  const newArray = [];
  const lookupObject = {};

  for (const i in originalArray) {
    lookupObject[originalArray[i][key]] = originalArray[i];
  }
  for (const i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};

export const generateRandomDigits = () => {
  const digits = [];

  while (digits?.length < 4) {
    const randomDigit = Math.floor(Math.random() * 10);
    if (!digits?.includes(randomDigit)) {
      digits.push(randomDigit);
    }
  }

  return digits.join('');
};

export const generateRandom = (): string => {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
};

export const randomMillion = () => {
  // Create an array of all possible 4-digit numbers
  const allNumbers = Array.from({ length: 10000 }, (_, i) =>
    i.toString().padStart(4, '0'),
  );

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = allNumbers?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
  }

  // Take the first 1 million numbers from the shuffled array
  const oneMillionNumbers = allNumbers.slice(0, 1000000);

  return oneMillionNumbers;
};

export const throwError = (error: any) => {
  throw error;
};

export const differenceInDays = (
  endDate: Date,
  compareDate: Date | null = null,
): number => {
  const startDate = compareDate ? new Date(compareDate) : new Date();
  const diffDate = new Date(endDate);
  return Math.floor((startDate.getTime() - diffDate.getTime()) / 86400000);
};
export const differenceInHours = (
  endDate: Date,
  compareDate: Date | null = null,
): number => {
  const startDate = compareDate ? new Date(compareDate) : new Date();
  const diffDate = new Date(endDate);
  return Math.floor(
    (startDate.getTime() - diffDate.getTime()) / (60 * 60 * 1000),
  );
};

export const dateFormatter = (dateToFormat: string) => {
  const date = new Date(dateToFormat);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });
};

export const splitByCapital = (word: string) => {
  let result = word.replace(/([A-Z])/g, ' $1').trim();
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
};
