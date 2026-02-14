import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSecureItem, setSecureItem } from '../utils/EncryptData';
import { astroContext } from './astroContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const kundaliContext = createContext();

function KundaliContextProvider({ children }) {
    const [initialformData, setInitialFormData] = useState("wait")
    const [kundaliData, setKundaliData] = useState(null)
    const [planetData, setPlanetData] = useState(null)
    const { setLoadingText, setLoading } = useContext(astroContext)
    const [chartsData, setChartsData] = useState(null)
    const [antardasha, setAntardasha] = useState(null)
    const [pratyantardasha, setPratyantardasha] = useState(null)
    const [language, setLanguage] = useState('en');
    const [chartType, setChartType] = useState("north")
    const [kundaliError, setKundaliError] = useState({
        type: "",
        message: "",
    })
    // kundali match
    const [initialKundaliMatchData, setInitialKundaliMatchData] = useState("wait")
    const [kundaliMatchData, setKundaliMatchData] = useState(null)
    const [kundaliMatchError, setKundaliMatchError] = useState({
        type: "",
        message: "",
    })
    // detect language change

    useEffect(() => {
        const getLanguage = () => {
            const match = document.cookie.match(/googtrans=\/[^\/]+\/([^;]+)/);
            if (match && match[1] !== language) {
                setLanguage(match[1]);
            }
        };

        const interval = setInterval(getLanguage, 1000); // Check every second

        return () => clearInterval(interval);
    }, [language]);

    useEffect(() => {
        if (language === 'hi') {
            setLanguage('hi');
        } else {
            setLanguage('en');
        }
    }, [language]);
    // const location = useLocation();  
    useEffect(() => {
        async function loadInitialData() {
            try {
                const sessionFormData = await getSecureItem("SESSION_DATA");
                if (sessionFormData) {
                    await fetchKundaliData(sessionFormData);
                } else {
                    setInitialFormData("nodata")
                }
            } catch (error) {
                setInitialFormData("nodata")
            }
        }
        if (location.pathname.startsWith('/astrology-details')) {
            loadInitialData();
        }

        async function loadKundaliMatchingData() {
            try {
                const sessionFormMatchData = await getSecureItem("SESSION_MATCH_DATA");
                if (sessionFormMatchData) {
                    await fetchKundliMatchData(sessionFormMatchData);
                } else {
                    setInitialKundaliMatchData("nodata")
                }
            } catch (error) {
                setInitialKundaliMatchData("nodata")
            }
        }
        if (location.pathname.startsWith('/match-report')) {
            loadKundaliMatchingData();
        }

    }, [language]);

    async function fetchKundaliData(data) {
        console.log(data)
        const formData = {
            "HH": data?.birthHour,
            "MT": data?.birthMinute,
            "dob": `${data?.birthYear}-${data.birthMonth}-${data.birthDay}`,
            "longt": `${data?.lng}`,
            "lat": `${data?.lat}`
        }
        console.log(formData)
        try {
            setKundaliError({ type: "", message: "" });
            setLoadingText("Fetching Kundali Data...")
            setInitialFormData(data);
            await setSecureItem('SESSION_DATA', data);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}api/get-data-from-csv`,
                formData
            );
            const planetResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}api/planetDetails`,
                formData
            )
            console.log(planetResponse)
            setChartsData(planetResponse?.data?.data)
            setKundaliData(response?.data?.data);

        } catch (error) {
            setKundaliError({ type: "error", message: "Something went wrong." });
            setInitialFormData("nodata");
            console.error("Error fetching kunndali data:", error);
        }
        finally {
            setLoadingText(null)
        }
    }

    async function fetchKundliMatchData(matchDetails) {
        setLoading(true);
        try {
            setKundaliMatchError({ type: "", message: "" });
            setLoadingText("Preparing your match report...")
            const boy = matchDetails?.boy;
            const girl = matchDetails?.girl;
            if (!boy || !girl) return;

            const formData = {
                "HH": matchDetails.boy.hour,
                "MT": matchDetails.boy.minute,
                "HH2": matchDetails.girl.hour,
                "MT2": matchDetails.girl.minute,
                "dob": `${matchDetails.boy?.year}-${matchDetails.boy?.month < 10 ? '0' + matchDetails.boy?.month : matchDetails.boy?.month}-${matchDetails.boy?.day < 10 ? '0' + matchDetails.boy?.day : matchDetails.boy?.day}`,
                "longt": `${matchDetails.boy?.lng}`,
                "lat": `${matchDetails.boy?.lat}`,
                "dob2": `${matchDetails.girl?.year}-${matchDetails.girl?.month < 10 ? '0' + matchDetails.girl?.month : matchDetails.girl?.month}-${matchDetails.girl?.day < 10 ? '0' + matchDetails.girl?.day : matchDetails.girl?.day}`,
                "longt2": `${matchDetails.girl?.lng}`,
                "lat2": `${matchDetails.girl?.lat}`
            };
            console.log(formData)
            await setSecureItem('SESSION_MATCH_DATA', matchDetails);
            setInitialKundaliMatchData(matchDetails)
            const url = `${import.meta.env.VITE_BACKEND_URL}api/kundlimatching2`;
            const response = await axios.post(url, { ...formData });
            if (response) {
                setLoading(false)
                setKundaliMatchData(response?.data);
            }
        } catch (error) {
            setLoading(false)
            console.error("❌ Error fetching data:", error);
            setInitialKundaliMatchData("nodata")
            setKundaliMatchError({ type: "error", message: "Something went wrong." });
        }
    };

    const kundaliContextData = {
        initialformData,
        kundaliData,
        planetData,
        chartsData,
        kundaliError,
        fetchKundaliData,
        // mahadasha
        antardasha,
        setAntardasha,
        pratyantardasha,
        setPratyantardasha,
        // language,
        language,
        // set type of the charts
        chartType,
        setChartType,
        // matching 
        fetchKundliMatchData,
        initialKundaliMatchData,
        kundaliMatchData,
        kundaliMatchError
    }
    return (
        <kundaliContext.Provider value={kundaliContextData}>
            {children}
        </kundaliContext.Provider>
    )
}

export default KundaliContextProvider
