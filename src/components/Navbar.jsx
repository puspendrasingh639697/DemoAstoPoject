import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import down2 from "../assets/image/down2.png";
import loginicon from "../assets/image/loginicon.png";
import "./Navbar.css";
import { astroContext } from "../context/astroContext";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logoutUser, user, isUserLoading,setIsLoggedIn } =
    useContext(astroContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [numerologyDropdownOpen, setNumerologyDropdownOpen] = useState(false);

  const isKundaliRoute = ["/free-kundali", "/kundali-matching"].includes(
    location.pathname
  );
  const isNumerologyRoute = ["/numerology", "/numerology-calculator"].includes(
    location.pathname
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      if (!document.querySelector(".skiptranslate")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }

      const observer = new MutationObserver(() => {
        document.querySelectorAll("span").forEach((span) => {
          if (span.textContent.trim().toLowerCase() === "select language") {
            span.textContent = "ENG";
          }
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };

    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) {
      setTimeout(() => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          select.value = savedLang;
          select.dispatchEvent(new Event("change"));
        }
      }, 1000);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/logoutv2`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUser(null);
        setIsLoggedIn(false);
        sessionStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert(res?.data?.message || "Logout failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Logout error");
    }
  };

  const renderNavItem = (to, label, isNew = false) => (
    <li className="relative">
      {isNew && (
        <span className="absolute -top-5 -right-4 bg-yellow-500 text-sm text-black w-10 text-center rounded-full">
          new
        </span>
      )}
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "text-yellow-500 font-bold" : "hover:text-yellow-500"
        }
        onClick={() => setMenuOpen(false)}
      >
        {label}
      </NavLink>
    </li>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${isScrolled ? "bg-white shadow text-black" : "bg-white shadow text-black"
        }`}
    >
      <div className="flex justify-between items-center px-6 py-3">
        <Link to="/">
          <img src={logo} alt="Astro Captain Logo" className="h-[50px]" />
        </Link>

        {/* Desktop Navigation - now using xl-nav */}
        <ul className="hidden xl-nav:flex space-x-[16px] items-center text-sm">
          {renderNavItem("/", "Home")}
          {renderNavItem("/astro-page", "Astrologer")}
          {renderNavItem("/book-pandit", "Book Pandit")}
          {renderNavItem("/book-e-pooja", "E-Pooja")}
          {renderNavItem("/astrocouncelor-page", "AstroCounsel",true)}
          {renderNavItem("/vastu-making", "Vastu Shastra", true)}

          {/* Kundali Dropdown */}
          <li className="relative">
            <button
              className={`flex items-center ${isKundaliRoute
                ? "text-yellow-500 font-semibold"
                : "hover:text-yellow-500"
                }`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Kundali <img src={down2} alt="dropdown" className="ml-2" />
            </button>
            {dropdownOpen && (
              <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded py-2 w-48 z-50">
                <li>
                  <NavLink
                    to="/free-kundali"
                    className="block px-4 py-2 hover:bg-yellow-100"
                  >
                    Free Kundali
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/kundali-matching"
                    className="block px-4 py-2 hover:bg-yellow-100"
                  >
                    Kundali Matching
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button
              className={`flex items-center ${isNumerologyRoute
                ? "text-yellow-500 font-semibold"
                : "hover:text-yellow-500"
                }`}
              onClick={() => setNumerologyDropdownOpen(!numerologyDropdownOpen)}
            >
              Numerology <img src={down2} alt="dropdown" className="ml-2" />
            </button>
            {numerologyDropdownOpen && (
              <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded py-2 w-48 z-50">
                <li>
                  <NavLink
                    to="/numerology-calculator#personal-numerology"
                    className="block px-4 py-2 hover:bg-yellow-100"
                    onClick={() => setNumerologyDropdownOpen(!numerologyDropdownOpen)}
                  >
                    Personal Numerology
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/numerology-calculator#professional-numerology"
                    className="block px-4 py-2 hover:bg-yellow-100"
                    onClick={() => setNumerologyDropdownOpen(!numerologyDropdownOpen)}
                  >
                    Professional Numerology
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/numerology-calculator#divine-naming"
                    className="block px-4 py-2 hover:bg-yellow-100"
                    onClick={() => setNumerologyDropdownOpen(!numerologyDropdownOpen)}
                  >
                    Divine Naming
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {renderNavItem("/join-us", "Join Us")}

          <button>
            <div id="google_translate_element"></div>
          </button>
        </ul>

        {/* User Actions */}

        <div className="flex flex-row gap-5 items-center">
          {isUserLoading ? (
            <div className="w-10 h-10 rounded-full border-4 border-yellow-400 border-b-transparent animate-spin"></div>
          ) : isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/user-dashboard")}>
                <img
                  src={user?.profile_image?.profileImage || loginicon}
                  alt="profile"
                  className="rounded-full w-10 h-10 object-cover"
                />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 rounded-full bg-yellow-400 text-black hidden xl-nav:flex"
            >
              Login
            </button>
          )}
          {/* {} */}
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl-nav:hidden text-black text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="xl-nav:hidden fixed top-0 left-0 w-full h-screen bg-white z-50 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img src={logo} alt="Astro Captain Logo" className="h-[50px]" />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl text-black"
            >
              ✕
            </button>
          </div>

          <ul className="space-y-4 text-lg font-semibold">
            {renderNavItem("/astro-page", "Astrologer")}
            {renderNavItem("/book-pandit", "Book Pandit")}
            {renderNavItem("/book-e-pooja", "E-Pooja")}
            {renderNavItem("/astrocouncelor-page", "AstroCounsel", true)}
            {renderNavItem("/vastu-making", "Vastu", true)}

            {/* Kundali Dropdown */}
            <li>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full text-left flex items-center"
              >
                Kundali <img src={down2} alt="dropdown" className="ml-2" />
              </button>
              {dropdownOpen && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <NavLink
                      to="/free-kundali"
                      onClick={() => setMenuOpen(false)}
                      className="block"
                    >
                      Free Kundali
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/kundali-matching"
                      onClick={() => setMenuOpen(false)}
                      className="block"
                    >
                      Kundali Matching
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

             <li className="relative">
            <button
             className="w-full text-left flex items-center"
              onClick={() => setNumerologyDropdownOpen(!numerologyDropdownOpen)}
            >
              Numerology <img src={down2} alt="dropdown" className="ml-2" />
            </button>
            {numerologyDropdownOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/numerology-calculator#personal-numerology"
                    className="block px-4 py-2 hover:bg-yellow-100"
                    onClick={() => {setMenuOpen(false),setNumerologyDropdownOpen(!numerologyDropdownOpen)}}
                  >
                    Personal Numerology
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/numerology-calculator#professional-numerology"
                    className="block px-4 py-2 hover:bg-yellow-100"
                    onClick={() => {setMenuOpen(false),setNumerologyDropdownOpen(!numerologyDropdownOpen)}}
                  >
                    Professional Numerology
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/numerology-calculator#divine-naming"
                    className="block px-4 py-2 hover:bg-yellow-100"
                    onClick={() => {setMenuOpen(false),setNumerologyDropdownOpen(!numerologyDropdownOpen)}}
                  >
                    Divine Naming
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

            {renderNavItem("/join-us", "Join Us")}
          </ul>


          {/* Mobile User Section */}
          <div className="mt-6">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button onClick={() => navigate("/user-dashboard")}>
                  <img
                    src={user?.profile_image?.profileImage || loginicon}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-yellow-400 px-4 py-2 rounded-full text-black"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-400 px-4 py-2 w-full rounded-full text-black mt-4"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
