import { useEffect } from "react";

export default function usePolling(fn, interval) {
  useEffect(() => {
    fn();
    const id = setInterval(fn, interval);
    return () => clearInterval(id);
  }, []);
}
