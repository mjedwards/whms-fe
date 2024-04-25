import { useState, useEffect } from 'react';

export default function useCurrentYear(): number {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return currentYear;
}
