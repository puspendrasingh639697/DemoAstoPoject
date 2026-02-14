import React, {
  useEffect,
  useState,
  Suspense,
  useRef,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import MainLoader from "../components/Loaders/MainLoader";
import { astroContext } from "../context/astroContext";

import EpoojaBanner from "../assets/BookEPooja/EpoojaBanner.png";
import HowitWorksEpooja from "../components/BookEPooja/HowitWorksEpooja";
import Testimonials from "../components/BookaPandit/Testimonials";
const TempleCard = React.lazy(() =>
  import("../components/BookEPooja/TempleCard")
);

// Skeleton Loader for TempleCard
const TempleCardSkeleton = () => (
  <div className="border border-gray-200 rounded-lg shadow-md h-full w-full overflow-hidden animate-pulse">
    <div className="aspect-video w-full bg-gray-300 rounded-t-lg"></div>
    <div className="p-4 w-full">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-10 bg-gray-300 rounded-md w-full"></div>
    </div>
  </div>
);

function BookEPooja() {
  const [temples, setTemples] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchHasMore, setSearchHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const loadingRef = useRef(null);
  const limit = 5;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { loader: initialLoader } = useContext(astroContext).templeData;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchData = useCallback(
    async (isSearchMode, currentPage, term = "") => {
      setIsLoading(true);
      try {
        let res;
        if (isSearchMode && term) {
          res = await axios.get(
            `${BASE_URL}api/search-temple?name=${term}&page=${currentPage}&limit=${limit}`
          );
          const newResults = res.data?.data?.temples || [];
          const hasNextPage = res.data?.pagination?.hasNextPage || false;

          setSearchResults((prev) => {
            if (currentPage === 1) return newResults;
            const existingIds = new Set(prev.map((t) => t._id));
            const filteredNew = newResults.filter((t) => !existingIds.has(t._id));
            return [...prev, ...filteredNew];
          });
          setSearchHasMore(hasNextPage);
        } else {
          res = await axios.get(
            `${BASE_URL}api/getAllTemples?page=${currentPage}&limit=${limit}`
          );
          const newTemples = res.data?.data || [];
          const hasNextPage = res.data?.pagination?.hasNextPage || false;

          setTemples((prev) => {
            if (currentPage === 1 && !isSearchMode) return newTemples;
            const existingIds = new Set(prev.map((t) => t._id));
            const filteredNew = newTemples.filter((t) => !existingIds.has(t._id));
            return [...prev, ...filteredNew];
          });
          setHasMore(hasNextPage);
        }
      } catch (err) {
        console.error(`Error fetching ${isSearchMode ? "search" : "temples"}:`, err);
        if (isSearchMode) {
          setSearchResults([]);
          setSearchHasMore(false);
        } else {
          setTemples([]);
          setHasMore(false);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [BASE_URL, limit]
  );

  useEffect(() => {
    if (isSearching) {
      if (debouncedTerm) {
        fetchData(true, searchPage, debouncedTerm);
      } else {
        setSearchResults([]);
        setSearchHasMore(false);
      }
    } else {
      fetchData(false, page);
    }
  }, [page, searchPage, debouncedTerm, isSearching, fetchData]);

  useEffect(() => {
    if (debouncedTerm) {
      setIsSearching(true);
      setSearchPage(1);
    } else {
      setIsSearching(false);
      setPage(1);
    }
  }, [debouncedTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          if (isSearching && searchHasMore) {
            setSearchPage((prev) => prev + 1);
          } else if (!isSearching && hasMore) {
            setPage((prev) => prev + 1);
          }
        }
      },
      { threshold: 1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [isSearching, hasMore, searchHasMore, isLoading]);

  const displayTemples = isSearching ? searchResults : temples;
  const currentHasMore = isSearching ? searchHasMore : hasMore;
  const noResultsMessage = isSearching ? "No more temples to load." : "No more temples to load.";
  const showSkeletons = isLoading && displayTemples.length === 0;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      {/* Banner Section */}
      <div
        className="w-full h-[80vh] sm:h-screen bg-cover bg-center flex flex-col items-center justify-center gap-3 filter contrast-125 brightness-90 px-4 text-center"
        style={{ backgroundImage: `url(${EpoojaBanner})` }}
      >
        <h1 className="text-white text-3xl sm:text-5xl font-bold mt-8">
          Book E Pooja
        </h1>
        <p className="text-white text-lg sm:text-2xl">
          Transform Your Space with Positive Energy
        </p>
        <button className="bg-[#FFD700] rounded-xl px-4 py-2 text-black font-semibold text-sm sm:text-base mt-2">
          Book Now
        </button>
      </div>

      {/* Main Section */}
      <div className="w-full max-w-7xl ">
        <div className="w-full flex flex-wrap items-center justify-between pt-1 pb-1 my-4 gap-2 px-4">
          <div className="text-lg sm:text-xl font-bold">Book E Pooja</div>
          <div className="w-full sm:w-1/3">
            <input
              placeholder="Search Temple.."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="w-full border-2 rounded-md border-customYellow py-1 px-2"
            />
          </div>
        </div>

        {/* Temples Section */}
        {initialLoader && page === 1 && !isSearching && displayTemples.length === 0 ? (
          Array.from({ length: limit }).map((_, index) => (
            <TempleCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 p-4 max-h-screen overflow-y-auto ">
            <Suspense fallback={<MainLoader />}>
              {showSkeletons ? (
                Array.from({ length: limit }).map((_, index) => (
                  <TempleCardSkeleton key={`skeleton-${index}`} />
                ))
              ) : displayTemples.length > 0 ? (
                displayTemples.map((temple) => (
                  <TempleCard key={temple._id + (isSearching ? "_s" : "_d")} obj={temple} />
                ))
              ) : (
                !isLoading && (
                  <p className="col-span-full text-center text-gray-500">
                    No temples found.
                  </p>
                )
              )}
              {isLoading && displayTemples.length > 0 &&
                Array.from({ length: 2 }).map((_, index) => (
                  <TempleCardSkeleton key={`load-skeleton-${index}`} />
                ))}
            </Suspense>
          </div>
        )}

        {/* No More Message */}
        {!isLoading && !currentHasMore && displayTemples.length > 0 && (
          <div className="text-gray-400 text-sm text-center mt-4">
            {noResultsMessage}
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        <div ref={loadingRef} className="h-1"></div>

        {/* Other Sections */}
        <div className="mx-4">
          <HowitWorksEpooja />
          <Testimonials />

        </div>
      </div>
    </div>
  );
}

export default BookEPooja;
