export const GRADE_TO_GR = {
  '9급': '9GR',
  '8급': '8GR',
  '7급Ⅱ': '7GR2',
  '7급': '7GR',
  '6급Ⅱ': '6GR2',
  '6급': '6GR',
  '5급Ⅱ': '5GR2',
  '5급': '5GR',
  '4급Ⅱ': '4GR2',
  '4급': '4GR',
  '준3급': 'P3GR',
  '3급Ⅱ': '3GR2',
  '3급': '3GR',
  '준2급': 'P2GR',
  '2급': '2GR',
  '준1급': 'P1GR',
  '1급Ⅱ': '1GR2',
  '1급': '1GR',
  '특급Ⅱ': 'SGR2',
  '특급': 'SGR'
};

export const BOARD_GRADES = {
  uhmoon: ['8급', '7급Ⅱ', '7급', '6급Ⅱ', '6급', '5급Ⅱ', '5급', '4급Ⅱ', '4급', '3급Ⅱ', '3급', '2급', '1급Ⅱ', '1급', '특급Ⅱ', '특급'],
  daehan: ['8급', '7급', '6급', '5급', '4급', '준3급', '3급', '준2급', '2급', '준1급', '1급'],
  korcham: ['9급', '8급', '7급', '6급', '5급', '4급', '3급', '2급', '1급']
};

export const GR_TO_GRADE = Object.entries(GRADE_TO_GR).reduce((acc, [grade, gr]) => {
  acc[gr] = grade;
  return acc;
}, {});

export const BOARD_NAMES = {
  'uhmoon': '한국어문회',
  'daehan': '대한검정회',
  'korcham': '상공회의소'
};
