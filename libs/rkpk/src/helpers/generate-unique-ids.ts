const randomSample = (uidArraySample = [], fn = Math.random) => {
  if (uidArraySample.length === 0) return;
  return uidArraySample[Math.round(fn() * (uidArraySample.length - 1))];
};

export const getId = (limit = 11, fn = Math.random) => {
  const allowedLetters: any = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ].join('');
  const allowedChars: any = ['0123456789', allowedLetters].join('');

  const generatedId = [randomSample(allowedLetters, fn)];

  for (let i = 0; i < limit - 1; i++) {
    generatedId.push(randomSample(allowedChars, fn));
  }

  return generatedId.join('');
};

export const generateRandomNumbers = (length: number) => {
  let randomNumber = '';
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      randomNumber += Math.floor(Math.random() * 9) + 1;
    } else {
      randomNumber += Math.floor(Math.random() * 10);
    }
  }
  return randomNumber;
};
