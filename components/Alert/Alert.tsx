import React from 'react';
import { useDispatch } from 'react-redux';
import { alertShow } from '../../store/actions/actions';
import style from './Alert.module.scss';

const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const handleCloseAlert = () => {
    dispatch(alertShow(false));
  };

  return (
    <div className={style.alert}>
      <span onClick={handleCloseAlert} className={style.closeAlert}>
        X
      </span>
      Сохранение пошло успешно
    </div>
  );
};

export default Alert;
