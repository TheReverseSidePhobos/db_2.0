import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { alertShowAC } from '../../store/actions/actions';
import style from './Alert.module.scss';
import cn from 'classnames';
import Image from 'next/image';
interface alertProps {
  type?: string;
  text?: string;
}

const Alert: React.FC<alertProps> = ({ type = '', text = '' }) => {
  const dispatch = useDispatch();
  const handleCloseAlert = () => {
    dispatch(alertShowAC(false));
  };

  setTimeout(() => {
    handleCloseAlert();
  }, 3000);

  return (
    <div className={style.alert} id={'alert'}>
      <div
        className={cn(style.content, {
          [style.green]: type === 'success',
          [style.red]: type === 'error',
          [style.blue]: type === 'attantion'
        })}
      >
        <span onClick={handleCloseAlert} className={style.popup__close}>
          X
        </span>
        {type === 'success' ? (
          <div className={style.img}>
            <Image src="/success.svg" alt="success" width={200} height={200} />
          </div>
        ) : type === 'error' ? (
          <div className={style.img}>
            <Image src="/error.svg" alt="error" width={200} height={200} />
          </div>
        ) : type === 'attention' ? (
          <div className={style.img}>
            <Image
              src="/attention.svg"
              alt="attention"
              width={200}
              height={200}
            />
          </div>
        ) : null}
        <h3 className={style.text}>{text}</h3>
      </div>
    </div>
  );
};

export default Alert;
