import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from 'lucide-react';

const PlacesAutocomplete = ({ setSelectedPlace }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);
  const geocoder = useRef(null);
  const debounceTimer = useRef(null);

  // Initialize Google Places services
  useEffect(() => {
    const initializeServices = () => {
      if (window.google && window.google.maps) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
        placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
        geocoder.current = new window.google.maps.Geocoder();
        setError('');
      } else {
        setError('Google Maps API not loaded. Please check your API key.');
      }
    };

    // Check if Google Maps is already loaded
    if (window.google) {
      initializeServices();
    } else {
      // Wait for Google Maps to load
      const checkGoogleMaps = setInterval(() => {
        if (window.google) {
          initializeServices();
          clearInterval(checkGoogleMaps);
        }
      }, 100);

      // Clean up interval after 10 seconds
      setTimeout(() => clearInterval(checkGoogleMaps), 10000);
    }
  }, []);

  // Fetch autocomplete suggestions
  const fetchSuggestions = (input) => {
    if (!autocompleteService.current || input.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    const request = {
      input: input,
      types: ['establishment', 'geocode'],
      componentRestrictions: { country: [] } // Remove country restriction or set specific countries
    };

    autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
      setIsLoading(false);

      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions.slice(0, 5)); // Limit to 5 suggestions
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    });
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim()) {
      // Set new debounce timer for 1 second
      debounceTimer.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 500);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Get place details including coordinates
  const getPlaceDetails = (placeId, description) => {
    if (!placesService.current) return;

    setIsLoading(true);

    const request = {
      placeId: placeId,
      fields: ['name', 'geometry', 'formatted_address', 'place_id']
    };

    placesService.current.getDetails(request, (place, status) => {
      setIsLoading(false);

      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        const placeData = {
          name: place.name || description,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: place.place_id
        };

        setSelectedPlace(placeData);
        setQuery(description);
        setShowSuggestions(false);
      } else {
        setError('Could not fetch place details');
      }
    });
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    getPlaceDetails(suggestion.place_id, suggestion.description);
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle input blur (with delay to allow clicking suggestions)
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  // Clear selection
  const clearSelection = () => {
    setQuery('');
    setSelectedPlace(null);
    setSuggestions([]);
    setShowSuggestions(false);

    // Clear any pending debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    inputRef.current?.focus();
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="">
      <div className="relative">
        {/* Search Input */}
        <div className="relative">
          <input
            required
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search for places..."
            className="w-full pl-3 pr-10 text-sm py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none"
          />
          {query && (
            <button
              onClick={clearSelection}
              className="absolute right-3 top-2 h-4 w-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-4 w-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {suggestion.structured_formatting?.main_text || suggestion.description}
                    </div>
                    {suggestion.structured_formatting?.secondary_text && (
                      <div className="text-xs text-gray-500 mt-1">
                        {suggestion.structured_formatting.secondary_text}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected place details */}

    </div>
  );
};

export default PlacesAutocomplete;