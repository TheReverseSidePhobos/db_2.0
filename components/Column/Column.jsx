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
import Image from 'next/image';

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
                onChange={(e) => {handleSorting(e.target.value, position_name)}}
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

                  <h5
                    className={
                      item.priority == 'lowest'
                        ? 'priority green'
                        : item.priority == 'low'
                        ? 'priority green'
                        : item.priority == 'medium'
                        ? 'priority blue'
                        : item.priority == 'high'
                        ? 'priority red'
                        : item.priority == 'highest'
                        ? 'priority red'
                        : 'priority'
                    }
                  ></h5>
                  {
                    (priorityStr =
                      item.priorityNum == 1
                        ? 'lowest'
                        : item.priorityNum == 2
                        ? 'low'
                        : item.priorityNum == 3
                        ? 'medium'
                        : item.priorityNum == 4
                        ? 'high'
                        : 'highest')
                  }
                  <div className={style.buttons}>
                    <div onClick={() => handlePrevBtn(item)}>
                      <Image
                        src={'/left-arrow.png'}
                        alt="left-arrow"
                        width={20}
                        height={20}
                      />
                    </div>
                    <h3 className={style.item_title}>{item.name}</h3>
                    <div onClick={() => handleNextBtn(item)}>
                      <Image
                        src={'/right-arrow.png'}
                        alt="right-arrow"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <br />
                  <div className={style.item_text}>
                    {item.description.length >= 72
                      ? item.description.slice(0, 72) + '...'
                      : item.description}
                  </div>

                  <div className={style.timeContainer}>
                    <div className={style.startTime}>
                      <div className={style.imgWrapper}>
                        <Image
                          src="/start.png"
                          width={80}
                          height={80}
                          alt="startIcon"
                        />
                      </div>
                      <span>{convertDateFunc(item.dateWasMade)}</span>
                    </div>
                    <div className={style.finishTime}>
                      <div className={style.imgWrapper}>
                        <Image
                          src="/finish.png"
                          width={80}
                          height={80}
                          alt="startIcon"
                        />
                      </div>
                      <span
                        className={
                          item.dateFinish > item.dateWasMade
                            ? `${style.green}`
                            : `${style.red}`
                        }
                      >
                        {convertDateFunc(item.dateFinish)}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => handleInfoModalShow(item)}
                    className={style.detailed}
                  >
                    Show Details
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    </>
  );
};

export default Column;
