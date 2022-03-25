import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './Column.module.scss';
import { convertDateFunc } from '../../utils/ustils';
import {
  toggleInfoModal,
  saveObjForInfo,
  updateTasks
} from '../../store/actions/actions';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Card from '../Card/Card';

const Column = ({ position, inner_tasks, handleSorting }) => {
  const dispatch = useDispatch();

  const position_name =
    position == 'new'
      ? 'New Tasks'
      : position == 'progress'
      ? 'In Progress'
      : position == 'done'
      ? 'Done'
      : null;
  const handeDeleteBtn = (id, inner_tasks) => {
    let taskIndex = inner_tasks.findIndex((item) => item.id == id);
    if (taskIndex !== -1) {
      inner_tasks.splice(taskIndex, 1);
    }
    dispatch(updateTasks(inner_tasks));
    let tasksJs = JSON.stringify(inner_tasks);
    Cookies.set('tasks', tasksJs);
  };

  const { tasks } = useSelector((state) => state.task);

  const changePosition = (id, position, tasks) => {
    tasks.map((item) => {
      if (item.id == id) {
        item.position = position;
      }
    });
    dispatch(updateTasks(tasks));
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
    dispatch(toggleInfoModal(true));
  };

  const dragStartHandle = (e, item, position) => {
    localStorage.setItem('item', JSON.stringify(item));
  };

  const drapHandle = (e, position) => {
    let i = JSON.parse(localStorage.getItem('item'));
    changePosition(i.id, position, tasks);
  };
  let sorted;

  const hangleChange = (sortingType, position_name) => {
    debugger;
    let copiedArr = inner_tasks;
    inner_tasks.filter((item) => item.position == position_name);
    sorted = inner_tasks.sort((a, b) =>
      a.priorityNum > b.priorityNum ? 1 : -1
    );
  };

  let priorityStr;

  return (
    <>
      <div
        className={style.colomn}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          drapHandle(e, position);
        }}
      >
        <div className={style.title}>
          <div>{position_name}</div>
          <div className={style.sorting}>
            <div className={style.selectContainer}>
              <select
                onChange={(e) => {
                  handleSorting(e.target.value, position_name);
                }}
                className={style.select}
              >
                <option>By Priority ASC</option>
                <option>By Priority DESC</option>
                <option>By Date ASC</option>
                <option>By Date DESC</option>
              </select>
            </div>
          </div>
        </div>
        <div className={style.cards}>
          {inner_tasks &&
            inner_tasks.map((item) =>
              item && item.position == position ? (
                <Card
                  item={item}
                  dragStartHandle={dragStartHandle}
                  changePosition={changePosition}
                  position={position}
                  tasks={tasks}
                />
                // <div
                //   className={style.card}
                //   key={item.id}
                //   draggable={true}
                //   onDragStart={(e) => {
                //     dragStartHandle(e, item, position);
                //   }}
                // >
                //   <span
                //     onClick={(e) => handeDeleteBtn(item.id, tasks)}
                //     className={style.close}
                //   >
                //     X
                //   </span>

                //   <div className={style.buttons}>
                //     <div
                //       className={style.item__arrow}
                //       onClick={() => handlePrevBtn(item)}
                //     >
                //       <Image
                //         src={'/left-arrow.svg'}
                //         alt="left-arrow"
                //         width={32}
                //         height={32}
                //       />
                //     </div>
                //     <h3 className={style.item_title}>{item.name}</h3>
                //     <div
                //       className={style.item__arrow}
                //       onClick={() => handleNextBtn(item)}
                //     >
                //       <Image
                //         src={'/right-arrow.svg'}
                //         alt="right-arrow"
                //         width={32}
                //         height={32}
                //       />
                //     </div>
                //   </div>

                //   <div className={style.item_text}>
                //     {item.description.length >= 72
                //       ? item.description.slice(0, 72) + '...'
                //       : item.description}
                //   </div>

                //   <div className={style.timeAndPriop}>
                //     <div className={style.priorityWrapper}>
                //       {
                //         (priorityStr =
                //           item.priorityNum == 1 ? (
                //             <div className={style.imgContainer}>
                //               <img src={'/lowPriority.png'} alt="Priority" />
                //             </div>
                //           ) : item.priorityNum == 2 ? (
                //             <div className={style.imgContainer}>
                //               <img src={'/lowPriority.png'} alt="Priority" />
                //             </div>
                //           ) : item.priorityNum == 3 ? (
                //             <div className={style.imgContainer}>
                //               <img src={'/middlePriority.png'} alt="Priority" />
                //             </div>
                //           ) : item.priorityNum == 4 ? (
                //             <div className={style.imgContainer}>
                //               <img src={'/highPriority.png'} alt="Priority" />
                //             </div>
                //           ) : (
                //             <div className={style.imgContainer}>
                //               <img src={'/highPriority.png'} alt="Priority" />
                //             </div>
                //           ))
                //       }
                //     </div>
                //     <div className={style.clockWrapper}>
                //       <img src="/clock.png" alt="clock" />
                //     </div>
                //     <div className={style.dateWrapper}>
                //       {convertDateFunc(item.dateFinish)}
                //     </div>
                //   </div>
                //   <div
                //     onClick={() => handleInfoModalShow(item)}
                //     className={style.detailed}
                //   >
                //     Show Details
                //   </div>
                // </div>
              ) : null
            )}
        </div>
      </div>
    </>
  );
};

export default Column;
