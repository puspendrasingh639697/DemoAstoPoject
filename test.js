const hiGrid = [
  'सु', 'प्र', 'उ', 'बि', 'हो', 'मु', 'ग', 'ब', 'सु', 'नु', 'बि', 'घ', 'धि', 'इ ', 'द',
  'र', 'रु', 'फ', 'सि', 'सि', "रहिं ", 'बस', 'हिं', 'मं', 'ल', 'न', 'ल', 'य', 'न', 'अं',
  'सुज', 'सो', 'ग', 'सु', 'कु', 'म', 'स', 'ग', 'त', 'न', 'ई', 'ल', 'धा', 'बे', 'नो',
  'त्य', 'र', 'न', 'कु', 'जो', 'म', 'रि', 'र', 'र', 'अ', 'की', 'हो', 'सं', 'रा', 'य',
  'पु', 'सु', 'थ', 'सी', 'जे', 'इ', 'ग', 'म', 'सं', 'क', 'रे', 'हो', 'स', 'स', 'नि',
  'त', 'र', 'त', 'र', 'स', 'हूँ', 'ह', 'ब', 'ब', 'प', 'चि', 'स', 'हिं', 'स', 'तु',
  'म', 'का', 'ा', 'र', 'र', 'म', 'मि', 'मी', 'म्हा', 'ा', 'जा', 'हू', 'हीं', 'ा', 'ा',
  'ता', 'रा', 'रे', 'री', 'हृ', 'का', 'फ', 'खा', 'जू', 'ई', 'र', 'रा', 'पू', 'द', 'ल',
  'नि', 'को', 'जो', 'गो', 'न', 'मु', 'जि', 'यँ', 'ने', 'मनि', 'क', 'ज', 'प', 'स', 'ल',
  'हि', 'रा', 'मि', 'स', 'रि', 'ग', 'द', 'न्मु', 'ख', 'म', 'खि', 'जि', 'म', 'त', 'जं',
  'सिं', 'ख', 'नु', 'न', 'कौ', 'मि', 'निज', 'र्क', 'ग', 'धु', 'ध', 'सु', 'का', 'स', 'र',
  'गु', 'ब', 'म', 'अ', 'रि', 'नि', 'म', 'ल', 'ा', 'न', 'ढ़ै', 'ती', 'न', 'क', 'भ',
  'ना', 'पु', 'व', 'अ', 'ा', 'र', 'ल', 'ा', 'ए', 'तु', 'र', 'न', 'नु', 'वै', 'ध',
  'सि', 'हूँ', 'सु', 'म्ह', 'रा', 'र', 'स', 'स', 'र', 'त', 'न', 'ख', 'ा', 'ज', 'ा',
  'र', 'ा', 'ा', 'ला', 'धी', 'ा', 'री', 'ा', 'हू', 'हीं', 'खा', 'जू', 'ई', 'र', 'ा'
];

const enGrid = [
  'Su', 'Pra', 'U', 'Bi', 'Ho', 'Mu', 'Ga', 'Ba', 'Su', 'Nu', 'Bi', 'Gha', 'Dhi', 'I ', 'Da',
  'Ra', 'Ru', 'Pha', 'Si', 'Si', "Rahin ", 'Bas', 'Hin', 'Man', 'La', 'Na', 'La', 'Ya', 'Na', 'An',
  'Suj', 'So', 'Ga', 'Su', 'Ku', 'Ma', 'Sa', 'Ga', 'Ta', 'Na', 'Ee', 'La', 'Dha', 'Be', 'No',
  'Tya', 'Ra', 'Na', 'Ku', 'Jo', 'Ma', 'Ri', 'Ra', 'Ra', 'A', 'Ki', 'Ho', 'San', 'Rā', 'Ya',
  'Pu', 'Su', 'Tha', 'Sī', 'Je', 'I', 'Ga', 'Ma', 'San', 'Ka', 'Re', 'Ho', 'Sa', 'Sa', 'Ni',
  'Ta', 'Ra', 'Ta', 'Ra', 'Sa', 'Hōn', 'Ha', 'Ba', 'Ba', 'Pa', 'Chi', 'Sa', 'Hin', 'Sa', 'Tu',
  'Ma', 'Kā', 'ā', 'Ra', 'Ra', 'Ma', 'Mi', 'Mē', 'Mhā', 'ā', 'Jā', 'Hō', 'Hēn', 'ā', 'ā',
  'Tā', 'Rā', 'Re', 'Rē', 'Hra', 'Kā', 'Pha', 'Khā', 'Jū', 'Ē', 'Ra', 'Rā', 'Pū', 'Da', 'La',
  'Ni', 'Ko', 'Jo', 'Go', 'Na', 'Mu', 'Ji', 'Yan', 'Ne', 'Mani', 'Ka', 'Ja', 'Pa', 'Sa', 'La',
  'Hi', 'Rā', 'Mi', 'Sa', 'Ri', 'Ga', 'Da', 'Nmu', 'Kha', 'Ma', 'Khi', 'Ji', 'Ma', 'Ta', 'Jan',
  'Sin', 'Kha', 'Nu', 'Na', 'Kau', 'Mi', 'Nij', 'Rk', 'Ga', 'Dhu', 'Dha', 'Su', 'Kā', 'Sa', 'Ra',
  'Gu', 'Ba', 'Ma', 'A', 'Ri', 'Ni', 'Ma', 'La', 'ā', 'Na', 'Dhai', 'Tī', 'Na', 'Ka', 'Bha',
  'Nā', 'Pu', 'Va', 'A', 'ā', 'Ra', 'La', 'ā', 'E', 'Tu', 'Ra', 'Na', 'Nu', 'Vai', 'Dha',
  'Si', 'Hūn', 'Su', 'Mh', 'Rā', 'Ra', 'Sa', 'Sa', 'Ra', 'Ta', 'Na', 'Kha', 'ā', 'Ja', 'ā',
  'Ra', 'ā', 'ā', 'Lā', 'Dhī', 'ā', 'Rī', 'ā', 'Hū', 'Hīn', 'Khā', 'Jū', 'Ē', 'Ra', 'ā'
];

// console.log(combined);

let ensentence = ""
let hisentence = ""
const sentenceArrayEn = []
const sentenceArrayHi = []

for (let j = 0; j < 9; j++) {
  let currentIndex = j
  let currentSentenceEn = ""
  let currentSentencehi
    = ""

  for (let i = 0; i < 25; i++) {
    currentSentenceEn = currentSentenceEn + enGrid[currentIndex];
    currentSentencehi = currentSentencehi + hiGrid[currentIndex];
    currentIndex = currentIndex + 1
  }
  currentIndex = currentIndex + 9

sentenceArrayEn.push(currentSentenceEn);
sentenceArrayHi.push(currentSentencehi);
}

console.log(sentenceArrayEn);
console.log(sentenceArrayHi);
// console.log(hisentence);