import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // เลื่อนไปบนสุดทุกครั้งที่เปลี่ยน route
  }, [pathname]);

  return null;
};

export default ScrollToTop;
