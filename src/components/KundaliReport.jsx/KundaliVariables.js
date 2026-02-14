const PLANET_NAMES = [
    "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn",
    "Rahu", "Ketu", "Ascendant", "Lagna", "Pluto", "Neptune", "Uranus"
];

const PLANET_NAMES_HINDI = {
    Sun: 'सूर्य',
    Moon: 'चंद्र',
    Mars: 'मंगल',
    Mercury: 'बुध',
    Jupiter: 'गुरु',
    Venus: 'शुक्र',
    Saturn: 'शनि',
    Rahu: 'राहु',
    Ketu: 'केतु',
    Ascendant: 'लग्न',
    Lagna: 'लग्न',
    Pluto: 'यम',
    Neptune: 'वरूण',
    Uranus: 'अरुण',
};

const planetColorMap = {
    Sun: '#FFC300',
    Moon: '#5DADE2',
    Mars: '#E74C3C',
    Mercury: '#2ECC71',
    Jupiter: '#D4AC0D',
    Venus: '#FF69B4',
    Saturn: '#7D3C98',
    Rahu: '#17A589',
    Ketu: '#D35400',
    Ascendant: '#34495E',
    Lagna: '#1F618D',
    Pluto: '#8E44AD',
    Neptune: '#3498DB',
    Uranus: '#F1C40F',
};

const avakhadaAttributes = [
    { varan: { en: "Varan", hi: "वर्ण" } },
    { sign: { en: "Sign", hi: "राशि" } },
    { SignLord: { en: "SignLord", hi: "राशि स्वामी" } },
    { Nakshatra: { en: "Nakshatra", hi: "नक्षत्र" } },
    { charan: { en: "Charan", hi: "चरण" } },
    { Nadi: { en: "Nadi", hi: "नाड़ी" } },
    { Yog: { en: "Yog", hi: "योग" } },
    { Karan: { en: "Karan", hi: "करण" } },
    { Tithi: { en: "Tithi", hi: "तिथि" } },
    { Tatva: { en: "Tatva", hi: "तत्व" } },
    { NameAlphabet: { en: "NameAlphabet", hi: "नाम अक्षर" } },
    { Paya: { en: "Paya", hi: "पाय" } },
    { Gan: { en: "Gan", hi: "गण" } },
    { Yoni: { en: "Yoni", hi: "योनि" } },
    { Vashya: { en: "Vashya", hi: "वश्य" } },
    { Name: { en: "Name", hi: "नाम" } },
    { Time: { en: "Time", hi: "समय" } },
    { Date: { en: "Date", hi: "तारीख" } },
    { Place: { en: "Place", hi: "स्थान" } },
    { Latitude: { en: "Latitude", hi: "अक्षांश" } },
    { Longitude: { en: "Longitude", hi: "देशांतर" } },
    { Ayanamsha: { en: "Ayanamsha", hi: "अयनांश" } },
    { Address: { en: "Address", hi: "पता" } },
    { BasicDetails: { en: "Basic Details", hi: "मूल विवरण" } },
    { PanchangDetails: { en: "Panchang Details", hi: "पंचांग विवरण" } },
    { AvakhadaDetails: { en: "Avakhada Details", hi: "अवाखड़ा विवरण" } },
];

const kundaliAttributes = [
    { Sun: { en: "Sun", hi: "सूर्य" } },
    { Moon: { en: "Moon", hi: "चंद्र" } },
    { Mars: { en: "Mars", hi: "मंगल" } },
    { Mercury: { en: "Mercury", hi: "बुव" } },
    { Jupiter: { en: "Jupiter", hi: "गुण" } },
    { Venus: { en: "Venus", hi: "शुक्र" } },
    { Saturn: { en: "Saturn", hi: "शनि" } },
    { Rahu: { en: "Rahu", hi: "राहु" } },
    { Ketu: { en: "Ketu", hi: "केतु" } },
    { Ascendant: { en: "Ascendant", hi: "लग्न" } },
    { Pluto: { en: "Pluto", hi: "यम" } },
    { Neptune: { en: "Neptune", hi: "वरूण" } },
    { Uranus: { en: "Uranus", hi: "धनु" } },
    { Direct: { en: "Direct", hi: "वक्र" } },
    { Retrograde: { en: "Retrograde", hi: "मार्गी" } },
    { Yes: { en: "Yes", hi: "हाँ" } },
    { No: { en: "No", hi: "नहीं" } },
    { KundaliChart: { en: "Kundali Chart", hi: "कुंडली चार्ट" } },
    { PlanetaryPositions: { en: "Planetary Positions", hi: "ग्रह स्थिति" } },
    { VimshottariDasha: { en: "Vimshottari Dasha", hi: "विम्शोत्तरी दशा" } },
    { Mahadasha: { en: "Mahadasha", hi: "महादशा" } },
    { Antardasha: { en: "Antardasha", hi: "अन्तर्दशा" } },
    { PratyantarDasha: { en: "Pratyantar Dasha", hi: "प्रत्यन्तर दशा" } },
    { MahadashaPeriods: { en: "Mahadasha Periods", hi: "महादशा काल" } },
    { AntardashaPeriods: { en: "Antardasha Periods", hi: "अन्तर्दशा काल" } },
    { PratyantarDashaPeriods: { en: "Pratyantar Dasha Periods", hi: "प्रत्यन्तर दशा काल" } },
    { LagnaAscendantBasicBirthChart: { en: "Lagna/ Ascendant/ Basic Birth Chart", hi: "लग्न/जन्म कुंडली" } },
    { Navasama: { en: "Navasama", hi: "नवसम" } },
    { Planet: { en: "Planet", hi: "ग्रह" } },
    { StartDate: { en: "Start Date", hi: "आरंभ तिथि" } },
    { EndDate: { en: "End Date", hi: "समाप्ति तिथि" } },
    { Next: { en: "Next", hi: "अगला" } },
];

const KpPlantes = [
    { Sun: { en: "Sun", hi: "सूर्य" } },
    { Moon: { en: "Moon", hi: "चंद्र" } },
    { Mars: { en: "Mars", hi: "मंगल" } },
    { Rahu: { en: "Rahu", hi: "राहु" } },
    { Jupiter: { en: "Jupiter", hi: "गुण" } },
    { Saturn: { en: "Saturn", hi: "शनि" } },
    { Mercury: { en: "Mercury", hi: "बुव" } },
    { Ketu: { en: "Ketu", hi: "केतु" } },
    { Venus: { en: "Venus", hi: "शुक्र" } },
    { Neptune: { en: "Neptune", hi: "वरूण" } },
    { Uranus: { en: "Uranus", hi: "धनु" } },
    { Pluto: { en: "Pluto", hi: "यम" } },

];

// kundali planets

const kundaliSigns = [
    { en: "Aries", hi: "मेष" },
    { en: "Taurus", hi: "वृषभ" },
    { en: "Gemini", hi: "मिथुन" },
    { en: "Cancer", hi: "कर्क" },
    { en: "Leo", hi: "सिंह" },
    { en: "Virgo", hi: "कन्या" },
    { en: "Libra", hi: "तुला" },
    { en: "Scorpio", hi: "वृश्चिक" },
    { en: "Sagittarius", hi: "धनु" },
    { en: "Capricorn", hi: "मकर" },
    { en: "Aquarius", hi: "कुंभ" },
    { en: "Pisces", hi: "मीन" }
];

const kundaliSignLord = [
    { en: "Mars", hi: "मंगल" },
    { en: "Venus", hi: "शुक्र" },
    { en: "Mercury", hi: "बुव" },
    { en: "Moon", hi: "चंद्र" },
    { en: "Sun", hi: "सूर्य" },
    { en: "Mercury", hi: "बुव" },
    { en: "Venus", hi: "शुक्र" },
    { en: "Mars", hi: "मंगल" },
    { en: "Jupiter", hi: "गुण" },
    { en: "Saturn", hi: "शनि" },
    { en: "Saturn", hi: "शनि" },
    { en: "Jupiter", hi: "गुण" },
]

const kundaliStarLord = [
    { en: "Ketu", hi: "केतु" },
    { en: "Venus", hi: "शुक्र" },
    { en: "Sun", hi: "सूर्य" },
    { en: "Moon", hi: "चंद्र" },
    { en: "Mars", hi: "मंगल" },
    { en: "Rahu", hi: "राहु" },
    { en: "Jupiter", hi: "गुण" },
    { en: "Saturn", hi: "शनि" },
    { en: "Mercury", hi: "बुव" },
]




const PLANET_NAMES_ORDER = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

export { PLANET_NAMES, PLANET_NAMES_ORDER, PLANET_NAMES_HINDI, planetColorMap, avakhadaAttributes, kundaliAttributes, KpPlantes, kundaliSigns, kundaliSignLord, kundaliStarLord };