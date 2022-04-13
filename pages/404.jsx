import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../components/Button';

const ErrorPage = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(5);

  setTimeout(() => {
    setTimer(timer - 1);
  }, 1000);
  setTimeout(() => {
    handleGoBack();
  }, 5000);

  const handleGoBack = () => {
    router.push('/');
  };
  return (
    <div className="errorPage">
      <div className="errorContainer">
        <div className="errorText">
          <h3>Something went wrong</h3>
          <Image src={'/sad.svg'} alt="smile" width={30} height={30} />
        </div>
        <div className="errorNote">
          You will be redirected automaticaly in {timer} sec
        </div>
        <Button
          text="go back"
          onClick={handleGoBack}
          size="md"
          type="lil-critical"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
