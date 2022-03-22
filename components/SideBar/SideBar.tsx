import React, { useEffect, useState } from 'react';
import style from './SideBar.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
// import * as types from '../../redux/actions/types';
// import { saveStartDate } from '../../redux/actions/actions';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Button from '../Button/Button';
import { setStartDate, toggleModal } from '../../store/actions/actions';

const SideBar: React.FC = () => {
  const sideBarStyle = cn(style.sidebar);
  const dispatch = useDispatch();

  const handleMakeTask = () => {
    dispatch(toggleModal());
  };
  const handleSaveToDb = () => {
    alert('here will be saving to db soon');
  };
  const { dateWasMade, tasks } = useTypedSelector((state) => state.task);

  const setStart = (startDate: any) => {
    dispatch(setStartDate(startDate));
  };
  // useEffect(() => {
  //   dispatch(setStartDate(new Date()))
  // })
  return (
    <>
      <div className={sideBarStyle}>
        <DatePicker
          selected={dateWasMade}
          inline
          onChange={(date) => setStart(date)}
        />
        <div className={style.btnWrapper}>
          <Button
            size="lg"
            type={'accept'}
            text="Make New Task"
            onClick={handleMakeTask}
          />
        </div>
        {tasks && tasks.length > 0 && (
          <div className={style.btnWrapper}>
            <Button
              size={'lg'}
              type={'critical'}
              text="Save tasks for this user"
              onClick={handleSaveToDb}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
