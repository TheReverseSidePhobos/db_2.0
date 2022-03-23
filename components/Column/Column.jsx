import React from 'react';
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

const Column = ({ position, inner_tasks }) => {
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
  const hangleChange = (e, position_name) => {
    debugger
    inner_tasks.filter((item) => item.position == position_name)
    sorted = inner_tasks.sort(function(a, b) {a.dateWasMade - b.dateWasMade})
    console.log(e);
    console.log(position_name);
  }
  
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
                <select onChange={e => hangleChange(e.target.value, position_name)} className={style.select}>
                  <option>By Priority</option>
                  <option>By Date</option>
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

                  <div className={style.item__priority}>{item.priority}</div>
                  <h3 className={style.item_title}>{item.name}</h3>
                  <br />
                  <div className={style.item_text}>
                    {item.description.length >= 20
                      ? item.description.slice(0, 20) + '...'
                      : item.description}
                  </div>
                  <div className={style.date}>
                    <div className={style.startDate}>
                      <Image src='/start.png' width={40} height={40} alt='startIcon'/>
                      <div className={style.date}>
                        {convertDateFunc(item.dateWasMade)}
                      </div>
                    </div>
                    <br />
                    <div className={style.startDate}>
                      <Image src='/finish.png' width={40} height={40} alt='startIcon'/>

                      <div className={style.date}>
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
                    <br />

                  </div>

                  <div className={style.buttons}>
                    <button
                      className={style.card__btn}
                      onClick={() => handlePrevBtn(item)}
                    >
                      Prev
                    </button>
                    <button
                      className={style.card__btn}
                      onClick={() => handleNextBtn(item)}
                    >
                      Next
                    </button>
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
