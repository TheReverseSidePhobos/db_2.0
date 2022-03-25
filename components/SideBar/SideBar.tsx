import React, { useEffect, useState } from 'react';
import style from './SideBar.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Button from '../Button/Button';
import {
  alertShow,
  setStartDate,
  toggleModal
} from '../../store/actions/actions';
import Cookie from 'js-cookie';

const SideBar: React.FC = () => {
  const sideBarStyle = cn(style.sidebar);
  const dispatch = useDispatch();
  
  const { dateWasMade, tasks } = useTypedSelector((state) => state.task);

  const handleMakeTask = () => {
    dispatch(toggleModal(true));
  };
  const handleSaveToCookie = (tasks: any[]) => {
    let tasksJs = JSON.stringify(tasks);
    Cookie.set('tasks', tasksJs);
    dispatch(alertShow(true));
    setTimeout(() => {
      dispatch(alertShow(false));
    }, 3000);
    // disable btn add class
  };
  
  const setStart = (startDate: any) => {
    dispatch(setStartDate(startDate));
  };

  return (
    <>
      <div className={sideBarStyle}>
        <div className={style.dp}>
          <DatePicker
            selected={dateWasMade}
            inline
            onChange={(date) => setStart(date)}
          />

        </div>
        <div className={style.btnsWrapper}>
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
                type={'primary'}
                text="Save tasks for this user"
                onClick={() => handleSaveToCookie(tasks)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
