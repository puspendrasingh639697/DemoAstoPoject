import React, { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { kundaliContext } from '../../context/KundaliContext';
import { use } from 'react';
import patraMid from "../../assets/image/patraMid.png";
import patraLeft from "../../assets/image/patraLeft.png";
import patraRight from '../../assets/image/patraRight.png';
import PatraNew from './PatraNew';

function RamShalakaMain() {
    // const { language } = useContext(kundaliContext);
    const [language, setLanguage] = useState("hi"); // Default to Hindi
    const [gridData, setGridData] = useState([]);
    const [animatedSentence, setAnimatedSentence] = useState([]);
    const [resultData, setResultData] = useState(null);

    // Hindi grid data
    const gridDataHindi = [
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

    ];

    // English grid data
    const gridDataEnglish = [
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

    const [activeIndex, setActiveIndex] = useState([]);

    function handleItemClick(index) {
        let sentence = ""
        let indexArray = []
        console.log(index,index%9)
        setActiveIndex([])
        setResultData(null)

        const section = document.getElementById('ramshalaka');
        const topOffset = section.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: topOffset, behavior: "smooth" });

        for (let i = 0; i < 25; i++) {
            if (index < gridData.length) {
                sentence += gridData[index].trim()
                indexArray.push(index)
            } else {
                index = (9 - (gridData.length - index))
            }
            index += 9
        }
        indexArray.forEach((i, index) => {
            setTimeout(() => {
                setActiveIndex(prev => [...prev, i]);
            }, index * 200);
        })

        console.log(index % 9)
        setTimeout(() => {
            setAnimatedSentence([]);
            setActiveIndex([]);
            setResultData(language === "hi" ? resultsHindi[index % 9] : resultsEnglish[index % 9]);
            const section = document.getElementById("patra");
            if (section) {
                const topOffset = section.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: topOffset, behavior: "smooth" });
            }
        }, 6000)

        if (language === "hi") {
            resultsHindi[index % 9].Chaupai.split("").forEach((char, i) => {
                setTimeout(() => {
                    setAnimatedSentence(prev => [...prev, char]);
                }, i * 50);
            });
        } else {
            resultsEnglish[index % 9].Chaupai.split("").forEach((char, i) => {
                setTimeout(() => {
                    setAnimatedSentence(prev => [...prev, char]);
                }, i * 50);
            });
        }
    }

    useEffect(() => {
        setGridData(language === "hi" ? gridDataHindi : gridDataEnglish);
    }, [language]);

    return (
        <div className="max-w-7xl mx-auto flex items-center flex-col justify-center">
            {/* <div className="min-w-[400px] grid gap-2 sm:gap-3 w-full rounded-xl bg-gradient-to-br from-yellow-200 via-red-100 to-orange-100 p-4 my-4 overflow-hidden"
                style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}>
                {gridData.map((item, index) => (
                    <motion.button
                        key={index}
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        transition={{
                            delay: index * 0.01,
                            duration: 0.4
                        }}
                        whileHover={{ scale: 1.1, zIndex: 200 }}
                        onClick={() => handleItemClick(index)}
                        className={`sm:backdrop-blur-lg sm:bg-white/20 border aspect-square border-white/30 sm:rounded-lg text-center text-xs font-semibold text-gray-800 sm:shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer hover:bg-white/80 hover:text-gray-900 
                            ${activeIndex.includes(index) ? 'popoutAndVanish' : ''}
                            `}
                    >
                        {item.trim()}
                    </motion.button>
                ))}
            </div> */}
            {/* Animated sentence */}

            <section id="ramshalaka" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }} className='grid border-red-600 border-[2px] items-center aspect-square  gap-[2px] mx-auto rounded-sm bg-gradient-to-br from-yellow-200 via-red-100 to-orange-100 p-[2px] my-4 overflow-hidden'>
                {gridData.map((item, index) =>
                    <span initial={{ scale: 0.5, opacity: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.01, duration: 0.4 }} whileHover={{ scale: 1.1, zIndex: 200 }} onClick={() => handleItemClick(index)} className={`text-center text-[8px] sm:text-[16px] border-[2px] border-red-600 h-full cursor-pointer flex items-center justify-center font-semibold text-red-800 ${activeIndex.includes(index) ? 'popoutAndVanish' : ''}`} key={index}>{item}</span>
                )}
            </section>

            {animatedSentence.length > 0 && (
                <div className='h-[100svh] fixed z-50 top-0 inset-0 flex items-center justify-center overflow-hidden'>
                    <div className="w-full max-w-2xl min-h-[40px] rounded-xl shadow-2xl mx-5 backdrop-blur-md bg-[#fffdf4] border border-red-500 p-6 text-center border-l-4 border-r-4 ">
                        <p className="text-[#3b2f2f] text-2xl md:text-3xl font-serif italic tracking-wide leading-relaxed text-left">
                            {animatedSentence.map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05, duration: 0.2 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </p>
                    </div>
                </div>
            )}


            {/* <section className="py-2 px-6 md:px-16 lg:px-24 bg-white flex justify-center items-center flex-col mt-5 w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                    Answer From BalKand
                </h2>


                <div className='flex flex-row gap-0 justify-between w-full max-h-[600px] mx-auto'>
                    <motion.div className='w-fit' initial={{ opacity: 0, x: 400  }} whileInView={{ opacity: 1, x: 0  }} transition={{ duration: 1, ease: "easeOut" }}>
                        <img
                            src={patraLeft}
                            alt="Numerology Illustration"
                            className="h-full"
                        />
                    </motion.div>
                    <motion.div initial={{ hidden: true, opacity: 0 }} whileInView={{ opacity: 1, x: 0  }} transition={{ duration: 3, ease: "easeOut" }}>
                    <img
                        src={patraMid}
                        alt="Numerology Illustration"
                        className="h-full w-full"
                    />
                    </motion.div >
                    <motion.div className='flex justify-end'  initial={{ opacity: 0, x: -400 }} whileInView={{ opacity: 1, x: 0  }} transition={{ duration: 1, ease: "easeOut" }}>
                        <img
                            src={patraRight}
                            alt="Numerology Illustration"
                            className="h-full"
                        />
                    </motion.div>
                </div>
            </section> */}
            <section id="patra">
                {resultData && <PatraNew data={resultData} />}
            </section>


        </div>
    );
}

export default RamShalakaMain