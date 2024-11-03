import {useLocation} from "react-router-dom";
import {useEffect} from "react";

function ScrollToTop() {
    const {pathname} = useLocation();

    const scrollToTop = () => window.scrollTo(0, 0);

    useEffect(() => {
        scrollToTop();
    }, [pathname]);
}

export default ScrollToTop;