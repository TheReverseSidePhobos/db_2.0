import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Column.module.scss';
import { convertDateFunc } from '../../utils/ustils';
import {
  toggleInfoModal,
  saveObjForInfo,
  updateTasks
} from '../../store/actions/actions';
import { useSelector } from 'react-redux';

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

  return (
    <>
      <div
        className={styles.colomn}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          drapHandle(e, position);
        }}
      >
        <div className={styles.title}>{position_name}</div>
        <div className={styles.cards}>
          {inner_tasks &&
            inner_tasks.map((item) =>
              item && item.position == position ? (
                <div
                  className={styles.card}
                  key={item.id}
                  draggable={true}
                  onDragStart={(e) => {
                    dragStartHandle(e, item, position);
                  }}
                >
                  <span
                    onClick={(e) => handeDeleteBtn(item.id, tasks)}
                    className={styles.close}
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

                  <div className={styles.item__priority}>{item.priority}</div>
                  <h3 className={styles.item_title}>{item.name}</h3>
                  <br />
                  <div className={styles.item_text}>
                    {item.description.length >= 20
                      ? item.description.slice(0, 20) + '...'
                      : item.description}
                  </div>
                  <div className={styles.date}>
                    <span>Creation date: </span>
                    {convertDateFunc(item.dateWasMade)}
                    <br />
                    <span>Must be complited: </span>
                    <span
                      className={
                        item.dateFinish > item.dateWasMade
                          ? `${styles.green}`
                          : `${styles.red}`
                      }
                    >
                      {convertDateFunc(item.dateFinish)}
                    </span>
                  </div>

                  <div className={styles.buttons}>
                    <button
                      className={styles.card__btn}
                      onClick={() => handlePrevBtn(item)}
                    >
                      Prev
                    </button>
                    <button
                      className={styles.card__btn}
                      onClick={() => handleNextBtn(item)}
                    >
                      Next
                    </button>
                  </div>
                  <div
                    onClick={() => handleInfoModalShow(item)}
                    className={styles.detailed}
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
