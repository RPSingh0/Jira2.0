import useDebounce from "../../hooks/useDebounce.js";
import Search from "../../components/search/Search.jsx";
import {useProjectsContext} from "./ProjectsContext.jsx";
import {useEffect, useState} from "react";

function ProjectsSearch() {

    const {setSearchString, setPage} = useProjectsContext();
    const [inputValue, setInputValue] = useState("");

    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        setSearchString(debouncedValue);
        setPage(1);
    }, [debouncedValue]);

    return (
        <Search placeholder={"Search projects"} value={inputValue} setValue={setInputValue}/>
    );
}

export default ProjectsSearch;