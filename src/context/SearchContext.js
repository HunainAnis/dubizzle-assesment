import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getGistForUser, getPublicGists } from "../services/gistService";
import debounce from "lodash.debounce";

export const searchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [gistList, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserList = useCallback(async (search) => {
    setError(null);
    setLoading(true);
    getGistForUser(search)
      .then((response) => {
        if (response?.data?.length === 0) {
          setResults(null);
          setError({
            response: {
              data: {
                message: `no gist found for "${search}"`,
              },
            },
          });
        } else {
          setResults(response?.data);
          setError(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const getPublicList = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await getPublicGists();
      setResults(response?.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  const getUserListDebounced = useMemo(
    () => debounce((q) => getUserList(q), 300),
    [getUserList]
  );

  useEffect(() => {
    if (search.length === 0) {
      getPublicList();
    } else {
      getUserListDebounced(search);
    }
  }, [getPublicList, getUserListDebounced, search]);

  return (
    <searchContext.Provider
      value={{
        search,
        setSearch,
        gistList,
        loading,
        error,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};
