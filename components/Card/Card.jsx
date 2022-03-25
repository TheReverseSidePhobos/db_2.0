import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  updateTasks,
  toggleInfoModal,
  saveObjForInfo
} from '../../store/actions/actions';
import { convertDateFunc } from '../../utils/ustils';
import style from './Card.module.scss';

const Card = ({ item, dragStartHandle, changePosition, position, tasks }) => {
  const dispatch = useDispatch();

  const handeDeleteBtn = (id, inner_tasks) => {
    let taskIndex = inner_tasks.findIndex((item) => item.id == id);
    if (taskIndex !== -1) {
      inner_tasks.splice(taskIndex, 1);
    }
    dispatch(updateTasks(inner_tasks));
  };
  const handleNextBtn = (item) => {
    if (item.position == 'new') {
      changePosition(item.id, 'progress', tasks);
    } else if (item.position == 'progress') {
      changePosition(item.id, 'done', tasks);
    }
  };
  const handlePrevBtn = (item) => {
    if (item.position == 'done') {
      changePosition(item.id, 'progress', tasks);
    } else if (item.position == 'progress') {
      changePosition(item.id, 'new', tasks);
    }
  };

  const handleInfoModalShow = (item) => {
    dispatch(saveObjForInfo(item));
    dispatch(toggleInfoModal());
  };
  let priorityStr;
  return (
    <div
      className={style.card}
      key={item.id}
      draggable={true}
      onDragStart={(e) => {
        dragStartHandle(e, item, position);
      }}
    >
      <span
        onClick={(e) => handeDeleteBtn(item.id, tasks)}
        className={style.close}
      >
        X
      </span>

      <div className={style.buttons}>
        <div className={style.item__arrow} onClick={() => handlePrevBtn(item)}>
          <Image
            src={'/left-arrow.svg'}
            alt="left-arrow"
            width={32}
            height={32}
          />
        </div>
        <h3 className={style.item_title}>{item.name}</h3>
        <div className={style.item__arrow} onClick={() => handleNextBtn(item)}>
          <Image
            src={'/right-arrow.svg'}
            alt="right-arrow"
            width={32}
            height={32}
          />
        </div>
      </div>

      <div className={style.item_text}>
        {item.description.length >= 72
          ? item.description.slice(0, 72) + '...'
          : item.description}
      </div>

      <div className={style.timeAndPriop}>
        <div className={style.priorityWrapper}>
          {
            (priorityStr =
              item.priorityNum == 1 ? (
                <div className={style.imgContainer}>
                  <img src={'/lowPriority.png'} alt="Priority" />
                </div>
              ) : item.priorityNum == 2 ? (
                <div className={style.imgContainer}>
                  <img src={'/lowPriority.png'} alt="Priority" />
                </div>
              ) : item.priorityNum == 3 ? (
                <div className={style.imgContainer}>
                  <img src={'/middlePriority.png'} alt="Priority" />
                </div>
              ) : item.priorityNum == 4 ? (
                <div className={style.imgContainer}>
                  <img src={'/highPriority.png'} alt="Priority" />
                </div>
              ) : (
                <div className={style.imgContainer}>
                  <img src={'/highPriority.png'} alt="Priority" />
                </div>
              ))
          }
        </div>
        <div className={style.clockWrapper}>
          <img src="/clock.png" alt="clock" />
        </div>
        <div className={style.dateWrapper}>
          {convertDateFunc(item.dateFinish)}
        </div>
      </div>
      <div onClick={() => handleInfoModalShow(item)} className={style.detailed}>
        Show Details
      </div>
    </div>
  );
};

export default Card;
