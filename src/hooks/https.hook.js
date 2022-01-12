import { useCallback, useState } from "react";

export const useHttp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (url, method = 'GET', headers = {}) => {
        if (url) {
            try {
                setLoading(true);
                headers["x-rapidapi-host"] = "deezerdevs-deezer.p.rapidapi.com";
                headers["x-rapidapi-key"] = "95c8daabf8mshc384eaa8cb3ebbap165761jsnb522c150db6f";
                
                const response = await fetch(url, {
                    method, headers
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Something went wrong");
                }
                if (data.data) {
                    setLoading(false);
                }
                return data;
            } catch (e) {
                setError(e.message);
                throw e;
            }
        } else {
            setError('empty params');
            throw new Error('empty params');
        }
    }, []);

    return { error, request, loading };
}