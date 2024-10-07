import {useEffect, useState} from "react";

function useDebounce(value, timeDelay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, timeDelay);

        return () => clearTimeout(timer);
    }, [value, timeDelay]);

    return debounceValue;
}

export default useDebounce;