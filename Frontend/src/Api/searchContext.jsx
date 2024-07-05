import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchDataProvider = ({ children }) => {
  const [values, setValues] = useState({
    keywords: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => useContext(SearchContext);

export { useSearchContext, SearchDataProvider };
