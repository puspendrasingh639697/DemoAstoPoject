import { useState, useRef, useEffect, useContext } from "react";
import chart1 from "../../assets/image/patra.png";
import { kundaliContext } from "../../context/KundaliContext";
import { motion } from "framer-motion";
import FlowerCursor from "./FlowerCursor";
// Hindi grid data
const gridDataHindi = [
  [
    "सु",
    "प्र",
    "उ",
    "बि",
    "हो",
    "मु",
    "ग",
    "ब",
    "सु",
    "नु",
    "बि",
    "घ",
    "धि",
    "इ ",
    "द",
  ],
  [
    "र",
    "रु",
    "फ",
    "सि",
    "सि",
    "रहिं ",
    "बस",
    "हिं",
    "मं",
    "ल",
    "न",
    "ल",
    "य",
    "न",
    "अं",
  ],
  [
    "सुज",
    "सो",
    "ग",
    "सु",
    "कु",
    "म",
    "स",
    "ग",
    "त",
    "न",
    "ई",
    "ल",
    "धा",
    "बे",
    "नो",
  ],
  [
    "त्य",
    "र",
    "न",
    "कु",
    "जो",
    "म",
    "रि",
    "र",
    "र",
    "अ",
    "की",
    "हो",
    "सं",
    "रा",
    "य",
  ],
  [
    "पु",
    "सु",
    "थ",
    "सी",
    "जे",
    "इ",
    "ग",
    "म",
    "सं",
    "क",
    "रे",
    "हो",
    "स",
    "स",
    "नि",
  ],
  [
    "त",
    "र",
    "त",
    "र",
    "स",
    "हूँ",
    "ह",
    "ब",
    "ब",
    "प",
    "चि",
    "स",
    "हिं",
    "स",
    "तु",
  ],
  [
    "म",
    "का",
    "ा",
    "र",
    "र",
    "म",
    "मि",
    "मी",
    "म्हा",
    "ा",
    "जा",
    "हू",
    "हीं",
    "ा",
    "ा",
  ],
  [
    "ता",
    "रा",
    "रे",
    "री",
    "हृ",
    "का",
    "फ",
    "खा",
    "जू",
    "ई",
    "र",
    "रा",
    "पू",
    "द",
    "ल",
  ],
  [
    "नि",
    "को",
    "जो",
    "गो",
    "न",
    "मु",
    "जि",
    "यँ",
    "ने",
    "मनि",
    "क",
    "ज",
    "प",
    "स",
    "ल",
  ],
  [
    "हि",
    "रा",
    "मि",
    "स",
    "रि",
    "ग",
    "द",
    "न्मु",
    "ख",
    "म",
    "खि",
    "जि",
    "म",
    "त",
    "जं",
  ],
  [
    "सिं",
    "ख",
    "नु",
    "न",
    "कौ",
    "मि",
    "निज",
    "र्क",
    "ग",
    "धु",
    "ध",
    "सु",
    "का",
    "स",
    "र",
  ],
  [
    "गु",
    "ब",
    "म",
    "अ",
    "रि",
    "नि",
    "म",
    "ल",
    "ा",
    "न",
    "ढ़ै",
    "ती",
    "न",
    "क",
    "भ",
  ],
  [
    "ना",
    "पु",
    "व",
    "अ",
    "ा",
    "र",
    "ल",
    "ा",
    "ए",
    "तु",
    "र",
    "न",
    "नु",
    "वै",
    "ध",
  ],
  [
    "सि",
    "हूँ",
    "सु",
    "म्ह",
    "रा",
    "र",
    "स",
    "स",
    "र",
    "त",
    "न",
    "ख",
    "ा",
    "ज",
    "ा",
  ],
  [
    "र",
    "ा",
    "ा",
    "ला",
    "धी",
    "ा",
    "री",
    "ा",
    "हू",
    "हीं",
    "खा",
    "जू",
    "ई",
    "र",
    "ा",
  ],
];

// English grid data
const gridDataEnglish = [
  [
    "Su",
    "Pra",
    "U",
    "Bi",
    "Ho",
    "Mu",
    "Ga",
    "Ba",
    "Su",
    "Nu",
    "Bi",
    "Gha",
    "Dhi",
    "I ",
    "Da",
  ],
  [
    "Ra",
    "Ru",
    "Pha",
    "Si",
    "Si",
    "Rahin ",
    "Bas",
    "Hin",
    "Man",
    "La",
    "Na",
    "La",
    "Ya",
    "Na",
    "An",
  ],
  [
    "Suj",
    "So",
    "Ga",
    "Su",
    "Ku",
    "Ma",
    "Sa",
    "Ga",
    "Ta",
    "Na",
    "Ee",
    "La",
    "Dha",
    "Be",
    "No",
  ],
  [
    "Tya",
    "Ra",
    "Na",
    "Ku",
    "Jo",
    "Ma",
    "Ri",
    "Ra",
    "Ra",
    "A",
    "Ki",
    "Ho",
    "San",
    "Rā",
    "Ya",
  ],
  [
    "Pu",
    "Su",
    "Tha",
    "Sī",
    "Je",
    "I",
    "Ga",
    "Ma",
    "San",
    "Ka",
    "Re",
    "Ho",
    "Sa",
    "Sa",
    "Ni",
  ],
  [
    "Ta",
    "Ra",
    "Ta",
    "Ra",
    "Sa",
    "Hōn",
    "Ha",
    "Ba",
    "Ba",
    "Pa",
    "Chi",
    "Sa",
    "Hin",
    "Sa",
    "Tu",
  ],
  [
    "Ma",
    "Kā",
    "ā",
    "Ra",
    "Ra",
    "Ma",
    "Mi",
    "Mē",
    "Mhā",
    "ā",
    "Jā",
    "Hō",
    "Hēn",
    "ā",
    "ā",
  ],
  [
    "Tā",
    "Rā",
    "Re",
    "Rē",
    "Hra",
    "Kā",
    "Pha",
    "Khā",
    "Jū",
    "Ē",
    "Ra",
    "Rā",
    "Pū",
    "Da",
    "La",
  ],
  [
    "Ni",
    "Ko",
    "Jo",
    "Go",
    "Na",
    "Mu",
    "Ji",
    "Yan",
    "Ne",
    "Mani",
    "Ka",
    "Ja",
    "Pa",
    "Sa",
    "La",
  ],
  [
    "Hi",
    "Rā",
    "Mi",
    "Sa",
    "Ri",
    "Ga",
    "Da",
    "Nmu",
    "Kha",
    "Ma",
    "Khi",
    "Ji",
    "Ma",
    "Ta",
    "Jan",
  ],
  [
    "Sin",
    "Kha",
    "Nu",
    "Na",
    "Kau",
    "Mi",
    "Nij",
    "Rk",
    "Ga",
    "Dhu",
    "Dha",
    "Su",
    "Kā",
    "Sa",
    "Ra",
  ],
  [
    "Gu",
    "Ba",
    "Ma",
    "A",
    "Ri",
    "Ni",
    "Ma",
    "La",
    "ā",
    "Na",
    "Dhai",
    "Tī",
    "Na",
    "Ka",
    "Bha",
  ],
  [
    "Nā",
    "Pu",
    "Va",
    "A",
    "ā",
    "Ra",
    "La",
    "ā",
    "E",
    "Tu",
    "Ra",
    "Na",
    "Nu",
    "Vai",
    "Dha",
  ],
  [
    "Si",
    "Hūn",
    "Su",
    "Mh",
    "Rā",
    "Ra",
    "Sa",
    "Sa",
    "Ra",
    "Ta",
    "Na",
    "Kha",
    "ā",
    "Ja",
    "ā",
  ],
  [
    "Ra",
    "ā",
    "ā",
    "Lā",
    "Dhī",
    "ā",
    "Rī",
    "ā",
    "Hū",
    "Hīn",
    "Khā",
    "Jū",
    "Ē",
    "Ra",
    "ā",
  ],
];

// Hindi results data
const resultsHindi = [
  {
    Chaupai: "सुनु सिय सत्य असीस हमारी। पुजिहि मन कामना तुम्हारी।।",
    Where_in_Maanas:
      "यह चौपाई बालकाण्ड में श्री सीता जी के गौरी पूजन के प्रसंग में है। गौरी जी ने श्री सीता जी को आशीर्वाद दिया है।",
    Meaning:
      "हे सीता! हमारी सच्ची आसीस सुनो, तुम्हारी मनःकामना पूरी होगी। नारद का वचन सदा पवित्र (संशय, भ्रम आदि दोषों से रहित) और सत्य है। जिसमें तुम्हारा मन अनुरक्त हो गया है, वही वर तुमको मिलेगा।",
    Result: "प्रश्नकर्ता का प्रश्न उत्तम है, कार्य सिद्ध होगा।",
    Result_Color: "green",
  },
  {
    Chaupai: "प्रबिसि नगर कीजे सब काजा। हृदयँ राखि कोसलपुर राजा।।",
    Where_in_Maanas:
      "यह चौपाई सुन्दरकाण्ड में श्री हनुमान जी के लंका में प्रवेश करने के समय की है।",
    Meaning:
      "अयोध्यापुरी के राजा श्री रघुनाथजी को हृदय में रखे हुए नगर में प्रवेश करके सब काम कीजिए। उसके लिए विष अमृत हो जाता है, शत्रु मित्रता करने लगते हैं, समुद्र गाय के खुर के बराबर हो जाता है, अग्नि में शीतलता आ जाती है।",
    Result: "भगवान का स्मरण करते हुए कार्य आरम्भ करो, सफलता मिलेगी।",
    Result_Color: "green",
  },
  {
    Chaupai: "उधरहिं अंत न होइ बिनाशा। कालनेमि जिमि रावन राहा।।",
    Where_in_Maanas:
      "यह चौपाई बालकाण्ड के आरम्भ में सत्संग वर्णन के प्रसंग में है।",
    Meaning:
      "बहुरूपिए भी यदि साधु का वेष बना लें तो संसार उनके वेष के प्रभाव से उनकी वंदना करता है, परन्तु एक न एक दिन उनकी प्रकृति सामने आ ही जाती है. उनका कपट सदा के लिए छिप सकता जैसे कालनेमि, रावण और राहु का सत्य सामने आ ही गया।",
    Result: "इस कार्य में भलाई नहीं है। कार्य की सफलता में संदेह है।",
    Result_Color: "red",
  },
  {
    Chaupai: "बिधि बस सृजनु करिअ परिहरु। फनि मनि सम निज गुण अनुसरहिं।।",
    Where_in_Maanas:
      "यह चौपाई बालकाण्ड के आरम्भ में सत्संग वर्णन के प्रसंग में है।",
    Meaning:
      "दुष्ट भी सत्संगति पाकर सुधर जाते हैं, जैसे पारस के स्पर्श से लोहा सुहावना हो जाता है (सुंदर सोना बन जाता है), किन्तु दैवयोग से यदि कभी सज्जन कुसंगति में पड़ जाते हैं, तो वे वहाँ भी साँप की मणि के समान अपने गुणों का ही अनुसरण करते हैं। (अर्थात्‌ जिस प्रकार साँप का संसर्ग पाकर भी मणि उसके विष को ग्रहण नहीं करती तथा अपने सहज गुण प्रकाश को नहीं छोड़ती, उसी प्रकार साधु पुरुष दुष्टों के संग में रहकर भी दूसरों को प्रकाश ही देते हैं, दुष्टों का उन पर कोई प्रभाव नहीं पड़ता।)॥",
    Result: "खोटे मनुष्यों का संग छोड़ दो। कार्य पूर्ण होने में संदेह है।",
    Result_Color: "red",
  },
  {
    Chaupai: "हि भए सोई जो राम रचि राखा। को करि तर्क बढ़ावै साखा।।",
    Where_in_Maanas: "यह चौपाई बालकाण्ड में शिव पार्वती संवाद की है।",
    Meaning:
      "जो कुछ राम ने रच रखा है, वही होगा। तर्क करके कौन शाखा (विस्तार) बढ़ावे। (मन में) ऐसा कहकर शिव भगवान हरि का नाम जपने लगे और सती वहाँ गईं जहाँ सुख के धाम प्रभु राम थे।",
    Result:
      "कार्य पूर्ण होने में संदेह है, अत: उसे भगवान पर छोड़ देना श्रेयस्कर है।",
    Result_Color: "yellow",
  },
  {
    Chaupai: "मुनि मनागम संत समाजा। जो जन जुगन बिसरइ न गाजा।।",
    Where_in_Maanas: "यह चौपाई बालकाण्ड में संत-समागम तीर्थ के वर्णन में है।",
    Meaning:
      "संतों का समाज आनंद और कल्याणमय है, जो जगत में चलता-फिरता तीर्थराज (प्रयाग) है। जहां (उस संत समाज रूपी प्रयागराज में) राम भक्ति रूपी गंगाजी की धारा है और ब्रह्मविचार का प्रचार सरस्वतीजी हैं॥",
    Result: "प्रश्न उत्तम है। कार्य सिद्ध होगा।",
    Result_Color: "green",
  },
  {
    Chaupai: "गर्दभ सुधा रिपु कहहिं मिताई। गुप्त बेषु अचल तितलाई।।",
    Where_in_Maanas:
      "यह चौपाई श्री हनुमान जी के लंका में प्रवेश करने के समय की है।",
    Meaning:
      "(जो प्रभु श्री राम को ह्रदय में धारण करते हैं) उसके लिए विष अमृत हो जाता है, शत्रु मित्रता करने लगते हैं, समुद्र गाय के खुर के बराबर हो जाता है, अग्नि में शीतलता आ जाती है।",
    Result: "प्रश्न बहुत श्रेष्ठ है। कार्य सफल होगा।",
    Result_Color: "green",
  },
  {
    Chaupai: "बनहि कुबेर सुरेस समाना। रस समुझि धरि कांहि न जाना।।",
    Where_in_Maanas:
      "यह चौपाई लंकाकाण्ड में रावण की मृत्यु के पश्चात मन्दोदरी के विलाप के प्रसंग में है।",
    Meaning:
      "वरुण, कुबेर, इंद्र और वायु, इनमें से किसी ने भी रण में तुम्हारे सामने धैर्य धारण नहीं किया (अर्थात सामना न कर सके )।",
    Result: "कार्य पूर्ण होने में संदेह है।",
    Result_Color: "yellow",
  },
  {
    Chaupai: "भूसन मनोहर होहिं तुम्हारे। राम लखन सुनि भइ सुखारे।।",
    Where_in_Maanas:
      "यह चौपाई बालकाण्ड में पुष्पवाटिका से पुष्प लाने पर विश्वामित्र जी का आशीर्वाद है।",
    Meaning:
      "फूल पाकर मुनि ने पूजा की। फिर दोनों भाइयों को आशीर्वाद दिया कि तुम्हारे मनोरथ सफल हों। यह सुनकर राम-लक्ष्मण सुखी हुए।",
    Result: "प्रश्न बहुत उत्तम है। कार्य सिद्ध होगा।",
    Result_Color: "green",
  },
];

// English results data (translated from Hindi)
const resultsEnglish = [
  {
    Chaupai: "Sunu Siya Satya Asees Hamari. Pujihi Man Kamana Tumhari.",
    Where_in_Maanas:
      "This Chaupai is from Balkand, in the context of Sita's worship of Gauri. Gauri Devi blessed Sita.",
    Meaning:
      "O Sita! Listen to my true blessings, your heart's desires will be fulfilled. Narada's words are always pure and true. The groom your heart desires, you will get him.",
    Result:
      "The questioner's question is excellent, the work will be successful.",
    Result_Color: "green",
  },
  {
    Chaupai: "Prabisi Nagar Keeje Sab Kaja. Hridaya Rakhi Kosalpur Raja.",
    Where_in_Maanas:
      "This Chaupai is from Sundarkand, at the time of Shri Hanuman's entry into Lanka.",
    Meaning:
      "Keeping Shri Raghunathji, the King of Ayodhya, in your heart, do all your work upon entering the city. For him, poison becomes nectar, enemies become friends, the ocean becomes as small as a cow's hoof, and fire becomes cool.",
    Result: "Start the work remembering God, success will be achieved.",
    Result_Color: "green",
  },
  {
    Chaupai: "Udharahin Ant Na Hoi Binasha. Kalnemi Jimi Ravan Raha.",
    Where_in_Maanas:
      "This Chaupai is from the beginning of Balkand, in the context of describing good company (Satsang).",
    Meaning:
      "Even imposters, if they adopt the guise of a saint, the world worships them due to the influence of their guise, but sooner or later their true nature comes out. Their deceit cannot remain hidden forever, just as the truth of Kalnemi, Ravana, and Rahu was revealed.",
    Result: "There is no good in this work. Success of the work is doubtful.",
    Result_Color: "red",
  },
  {
    Chaupai:
      "Bidhi Bas Srijanu Karia Pariharu. Phani Mani Sam Nij Gun Anusarahin.",
    Where_in_Maanas:
      "This Chaupai is from the beginning of Balkand, in the context of describing good company (Satsang).",
    Meaning:
      "Even wicked people improve by good company, just as iron becomes beautiful gold by the touch of the philosopher's stone. But if, by chance, good people fall into bad company, they still follow their own virtues, like a snake's jewel. (Meaning: Just as a jewel does not absorb the snake's poison and does not lose its inherent light even in the company of a snake, similarly, virtuous people give light to others even in the company of wicked people; the wicked have no effect on them.)",
    Result: "Leave the company of bad people. Success of the work is doubtful.",
    Result_Color: "red",
  },
  {
    Chaupai: "Hi Bhaye Soi Jo Ram Rachi Rakha. Ko Kari Tark Badhave Sakha.",
    Where_in_Maanas:
      "This Chaupai is from Balkand, from the conversation between Shiva and Parvati.",
    Meaning:
      "Whatever Rama has ordained, that will happen. Who can increase the branches (complexity) by arguing? Saying this in his mind, Lord Shiva started chanting the name of Hari, and Sati went where Lord Rama, the abode of happiness, was.",
    Result:
      "Success of the work is doubtful, so it is better to leave it to God.",
    Result_Color: "yellow",
  },
  {
    Chaupai: "Muni Managam Sant Samaja. Jo Jan Jugan Bisarai Na Gaja.",
    Where_in_Maanas:
      "This Chaupai is from Balkand, in the description of the pilgrimage of saintly gatherings.",
    Meaning:
      "The assembly of saints is blissful and auspicious, which is a moving pilgrimage site (Prayag) in the world. Where (in that saintly assembly, which is like Prayagraj) there is the stream of devotion to Rama like the Ganges, and the propagation of divine knowledge like Saraswati.",
    Result: "The question is excellent. The work will be successful.",
    Result_Color: "green",
  },
  {
    Chaupai: "Gardabh Sudha Ripu Kahahin Mitai. Gupt Beshu Achal Titalai.",
    Where_in_Maanas:
      "This Chaupai is from Sundarkand, at the time of Shri Hanuman's entry into Lanka.",
    Meaning:
      "(For those who hold Lord Shri Rama in their heart) poison becomes nectar, enemies become friends, the ocean becomes as small as a cow's hoof, and fire becomes cool.",
    Result: "The question is very good. The work will be successful.",
    Result_Color: "green",
  },
  {
    Chaupai: "Banahi Kuber Sures Samana. Ras Samujhi Dhari Kanhi Na Jana.",
    Where_in_Maanas:
      "This Chaupai is from Lankakand, in the context of Mandodari's lament after Ravana's death.",
    Meaning:
      "Varuna, Kubera, Indra, and Vayu, none of them could stand firm against you in battle (meaning, they could not face you).",
    Result: "Success of the work is doubtful.",
    Result_Color: "yellow",
  },
  {
    Chaupai: "Bhusana Manohar Hohin Tumhare. Ram Lakhan Suni Bhai Sukhare.",
    Where_in_Maanas:
      "This Chaupai is from Balkand, a blessing from Vishwamitraji after bringing flowers from the flower garden.",
    Meaning:
      "After receiving the flowers, the sage performed worship. Then he blessed both brothers that their desires would be fulfilled. Hearing this, Rama and Lakshmana became happy.",
    Result: "The question is very good. The work will be successful.",
    Result_Color: "green",
  },
];

// Translations for UI text
const translations = {
  hi: {
    title: "राम शलाका प्रश्नावली",
    instructions:
      "अपने प्रश्न का उत्तर जानने के लिए ग्रिड में किसी भी अक्षर पर क्लिक करें।",
    animating: "अक्षर चुने जा रहे हैं...",
    resultTitle: "आपका प्रश्न का उत्तर",
    chaupai: "चौपाई:",
    whereInMaanas: "मानस में प्रसंग:",
    meaning: "अर्थ:",
    result: "परिणाम:",
    englishButton: "English",
    hindiButton: "हिंदी",
  },
  en: {
    title: "Ram Shalaka Prashnavali",
    instructions:
      "Click on any letter in the grid to know the answer to your question.",
    animating: "Selecting letters...",
    resultTitle: "Your Answer",
    chaupai: "Chaupai:",
    whereInMaanas: "Context in Manas:",
    meaning: "Meaning:",
    result: "Result:",
    englishButton: "English",
    hindiButton: "हिंदी",
  },
};

export default function chart() {
  const [selectedResult, setSelectedResult] = useState(null);
  const [animatedCells, setAnimatedCells] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeouts = useRef([]);
  const { language } = useContext(kundaliContext);

  const currentGridData = language === "hi" ? gridDataHindi : gridDataEnglish;
  const currentResults = language === "hi" ? resultsHindi : resultsEnglish;
  const t = translations[language]; // Current translation object

  const numRows = currentGridData.length;
  const numCols = currentGridData[0].length;
  const totalCells = numRows * numCols;

  // Clear timeouts on component unmount
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  const handleCellClick = (rowIndex, colIndex) => {
    // Clear any ongoing animations and results
    animationTimeouts.current.forEach(clearTimeout);
    animationTimeouts.current = [];
    setSelectedResult(null);
    setAnimatedCells([]);
    setIsAnimating(true);

    const startLinearIndex = rowIndex * numCols + colIndex;
    const resultIndex = startLinearIndex % currentResults.length; 

    for (let i = 0; i < 25; i++) {
      const currentLinearIndex = (startLinearIndex + i * 9) % totalCells;
      const timeoutId = setTimeout(() => {
        setAnimatedCells((prev) => [...prev, currentLinearIndex]);
      }, i * 200); 
      animationTimeouts.current.push(timeoutId);
    }

    // Set the final result after the animation completes
    const finalTimeoutId = setTimeout(() => {
      setSelectedResult(currentResults[resultIndex]);
      setIsAnimating(false);
    }, 9 * 200 + 300); // Total animation time + a small buffer
    animationTimeouts.current.push(finalTimeoutId);
  };

  return (
    <>
      {<FlowerCursor />}
      <div className="bg-yellow-100 border-l-4 border-yellow-600 text-yellow-900 p-5 rounded-xl shadow-md max-w-6xl mx-auto mt-6">
        <h4 className="text-xl font-bold mb-2">📌 Important Note</h4>
        <p className="text-base leading-relaxed">
          Please do not consider{" "}
          <span className="font-semibold text-red-600">Ram Shalaka</span> as a
          game. Trying again and again may lead to confusion.{" "}
          <br className="hidden sm:block" />
          <span className="font-semibold text-red-600">
            Ask your question with pure intention and believe the first result
            you receive.
          </span>
          <br className="hidden sm:block" />
          <span className="font-semibold text-green-600">
            Please read the instructions before using Ram Shalaka and follow
            them .{" "}
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-yellow-100 border-l-4 border-yellow-500 shadow-md p-6 rounded-xl max-w-3xl mx-auto mt-8"
        >
          <p className="text-gray-800 text-lg mb-4 leading-relaxed">
            <span className="font-semibold text-yellow-800">
              Ram Prashnavali
            </span>
            , also known as{" "}
            <span className="italic">Ram Shalaka Prashnavali</span>, is a
            divination tool used in Hinduism. It is primarily associated with
            Lord Rama, one of the incarnations of Lord Vishnu, and is used by
            devotees to seek answers to their questions or guidance for
            decision-making. The word{" "}
            <span className="italic">“Prashnavali”</span> translates to “oracle”
            or “divination.”
          </p>
          <p className="text-gray-800 text-lg leading-relaxed">
            <span className="font-semibold text-yellow-700">
              How to ask a question through Ram Prashnavali?
            </span>
            <br />
            <span className="block mt-2">
              🔸 <span className="font-medium">Step 1:</span> Close your eyes
              with a calm mind and meditate on{" "}
              <span className="font-semibold text-red-600">Sri Ram</span> for a
              few moments. Make your question in your mind.
            </span>
            <span className="block mt-2">
              🔸 <span className="font-medium">Step 2:</span> Say{" "}
              <span className="font-semibold text-red-600">
                “Jay Shree Ram”
              </span>{" "}
              and click anywhere on the Ram Prashnavali chart with closed eyes.
            </span>
            <span className="block mt-2">
              🔸 <span className="font-medium">Step 3:</span> Your answer page
              will load immediately.{" "}
              <span className="italic text-sm">
                (Please wait up to 5 seconds for the answer to load)
              </span>
            </span>
          </p>
        </motion.div>

        <div className="backdrop-blur-sm bg-white/80 w-full max-w-4xl rounded-xl p-6">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            {t.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6 text-center">
            {t.instructions}
          </p>

          {/* Grid */}
          <div
            className="grid  min-h-[calc(100svh-200px)] gap-[4px] mb-8 mx-auto bg-white p-2 text-xs rounded-lg border-2 overflow-hidden w-max border-red-600 shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
            }}
          >
            {currentGridData.flat().map((letter, index) => {
              const isAnimated = animatedCells.includes(index);
              return (
                <button
                  key={index}
                  className={`h-8 
                flex items-center justify-center rounded-md border-red-500 border text-lg font-semibold
                text-orange-500 bg-red-100 hover:bg-yellow-100 transition-colors duration-200
                ${isAnimating ? "cursor-not-allowed opacity-70" : ""}
                ${isAnimated ? "bg-yellow-300" : ""}
              `}
                  onClick={() =>
                    !isAnimating &&
                    handleCellClick(
                      Math.floor(index / numCols),
                      index % numCols
                    )
                  }
                  disabled={isAnimating}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
        {isAnimating && (
          <div className="text-xl font-semibold text-blue-600 text-center mb-4">
            {t.animating}
          </div>
        )}

        {selectedResult && (
          <div className="w-full ">
            <div className="relative w-full flex justify-center items-center">
              {/* Image container */}
              <img
                src={chart1}
                alt="Background"
                className="w-full max-w-4xl h-auto object-contain"
              />

              {/* Overlay Content - positioned over image */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="p-4 text-center max-w-2xl transition-transform duration-300 hover:scale-105 bg-yellow/70 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-red-700 mb-2">
                    {t.chaupai}
                  </h3>
                  <p className="text-2xl text-red-600 font-bold animate-pulse">
                    {selectedResult.Chaupai}
                  </p>
                </div>
              </div>
            </div>

            {/* Other content below the image */}
            <div className="w-full max-w-4xl mx-auto p-6 text-red-600 space-y-6 animate-fade-in">
              <div>
                <h3 className="text-xl font-semibold">{t.whereInMaanas}</h3>
                <p>{selectedResult.Where_in_Maanas}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t.meaning}</h3>
                <p>{selectedResult.Meaning}</p>
              </div>
              <div className="bg-white shadow-lg border-l-4 border-yellow-400 p-4 rounded-xl transition-transform hover:scale-105 duration-300 max-w-md mx-auto text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {t.result}
                </h3>
                <p
                  className={`text-lg font-bold animate-pulse ${
                    selectedResult.Result_Color === "green"
                      ? "text-green-600"
                      : selectedResult.Result_Color === "red"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {selectedResult.Result}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
