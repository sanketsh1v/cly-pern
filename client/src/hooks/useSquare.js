import { useState, useEffect } from 'react';

export const useSquare = () => {
  const [square, setSquare] = useState(null);
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    // Check if Square is loaded
    if (!window.Square) {
      console.error('Square.js failed to load');
      return;
    }

    const initializeSquare = async () => {
      try {
        const payments = await window.Square.payments(process.env.REACT_APP_SQUARE_APP_ID, process.env.REACT_APP_SQUARE_LOCATION_ID);
        setPayments(payments);
      } catch (e) {
        console.error('Square initialization failed', e);
      }
    };

    initializeSquare();
  }, []);

  return { payments };
};