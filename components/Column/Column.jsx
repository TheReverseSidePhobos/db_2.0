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

  const { newTasks, inProgressTasks, doneTasks } = useSelector((state) => state.task);
  let allTasks = [...newTasks, ...inProgressTasks, ...doneTasks]
  const changePosition = (id, position, tasks) => {
    tasks.map((item) => {
      if (item.id == id) {
        item.position = position;
      }
    });
    dispatch(updateTasks(tasks));
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
    changePosition(i.id, position, allTasks);
  };
  let sorted;

  const hangleChange = (sortingType, position_name) => {
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
                  key={item.id}
                  item={item}
                  dragStartHandle={dragStartHandle}
                  changePosition={changePosition}
                  position={position}
                  tasks={allTasks}
                />
              ) : null
            )}
        </div>
      </div>
    </>
  );
};

export default Column;
