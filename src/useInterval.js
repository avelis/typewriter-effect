import { useRef, useEffect } from "react";

// Explained here: https://overreacted.io/making-setinterval-declarative-with-react-hooks/?ref=reactpractice.dev
export default useInterval = (callback, delay) => {
    const savedCallback = useRef();
   
    useEffect(() => {
      savedCallback.current = callback;
    });
   
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
   
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }
