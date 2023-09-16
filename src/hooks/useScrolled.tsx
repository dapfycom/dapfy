import React from "react";

// This hook is used to detect if the user has scrolled the page
// and if so, it will return true, you can pass a number to the hook
// with the pixels that the user has to scroll to return true
const useScrolled = (scrollUntil?: number) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollUntil) {
        if (window.scrollY > scrollUntil) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      } else {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollUntil]);

  return scrolled;
};

export default useScrolled;
