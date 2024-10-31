import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './PaymentStatus.scss';

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status: paramStatus } = useParams();
  
  // Check both query params and URL params for status
  const queryParams = new URLSearchParams(location.search);
  const queryStatus = queryParams.get('status');
  const status = paramStatus || queryStatus;

  const isSuccess = status === 'success';

  return (
    <div className="payment-status">
      <div className="payment-status__container">
        {isSuccess ? (
          <>
            <h1 className="payment-status__title">Payment Successful!</h1>
            <p className="payment-status__message">
              Thank you for your donation to Calgary Laughter Yoga.
            </p>
          </>
        ) : (
          <>
            <h1 className="payment-status__title">Payment Failed</h1>
            <p className="payment-status__message">
              Sorry, there was an issue processing your payment.
            </p>
          </>
        )}
        <button 
          className="payment-status__button"
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus; 