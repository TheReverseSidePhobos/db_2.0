import React, { useEffect, useState } from 'react';
import style from './Modal.module.scss';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTypedSelector } from '../../components/hooks/useTypedSelector';
import { Formik, Field, Form } from 'formik';
import {
  add_task_to_redux,
  toggleInfoModal,
  toggleModal
} from '../../store/actions/actions';
import { setFinishDate, setStartDate } from '../../store/actions/actions';

import 'react-datepicker/dist/react-datepicker.css';
import { convertDateFunc } from '../../utils/ustils';

const Modal = () => {
  const dispatch = useDispatch();
  const {
    dateFinish,
    dateWasMade,
    newTasks,
    inProgressTasks,
    doneTasks,
    infoModalShow,
    infoObj
  } = useTypedSelector((state) => state.task);

  let allTasks = [...newTasks, ...inProgressTasks, ...doneTasks];

  const handleCloseModal = () => {
    dispatch(toggleInfoModal(false));
    dispatch(toggleModal(false));
  };

  const setDateFinish = (dateFinished: any) => {
    dispatch(setFinishDate(dateFinished));
  };
  const setDateStart = (dateStarted: any) => {
    dispatch(setStartDate(dateStarted));
  };

  useEffect(() => {
    setFinishDate(new Date());
  }, []);

  const handleSubmit = (task: any) => {
    dispatch(add_task_to_redux(task));
  };
  if (infoModalShow) {
    return (
      <div id={style.popup} className={style.popup}>
        <div className={style.popup__body}>
          <div className={style.popup__content}>
            <span onClick={handleCloseModal} className={style.popup__close}>
              X
            </span>
            <div className={style.popup__title}>Task Details</div>
            <div className={style.popup__body}>
              <div className={style.datePicker}>
                <div className={style.info_container}>
                  <div className={style.date_picker}>
                    <DatePicker
                      name="dp"
                      inline
                      selected={dateFinish}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  <div className={style.text_fields}>
                    <div>
                      <input
                        className={style.inp}
                        type="text"
                        value={infoObj?.name}
                      />
                    </div>
                    <div>
                      <input
                        className={style.inp}
                        type="text"
                        value={infoObj?.priority}
                      />
                    </div>
                    <div>
                      <textarea
                        className={style.txta}
                        // type="text"
                        value={infoObj?.description}
                      ></textarea>
                    </div>
                    <div className={style.complitedDate}>
                      <label>Must be complited for</label> <br />
                      {convertDateFunc(infoObj?.dateFinish)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div id={style.popup} className={style.popup}>
      <div className={style.popup__body}>
        <div className={style.popup__content}>
          <span onClick={handleCloseModal} className={style.popup__close}>
            X
          </span>
          <div className={style.popup__title}>Make New Task</div>
          <div className={style.popup__body}>
            <Formik
              initialValues={{
                name: '',
                description: '',
                priority: 'lowest'
              }}
              onSubmit={(values, { resetForm }) => {
                const { name, description, priority } = values;
                let priorityNum =
                  priority == 'lowest'
                    ? 1
                    : priority == 'low'
                    ? 2
                    : priority == 'medium'
                    ? 3
                    : priority == 'high'
                    ? 4
                    : 5;

                let task = {
                  id: allTasks.length,
                  name,
                  description,
                  priorityNum,
                  dateWasMade,
                  position: 'new',
                  dateFinish
                };
                handleSubmit(task);
                resetForm();
                handleCloseModal();
              }}
            >
              {({ errors, touched, values }) => (
                <Form className={style.form}>
                  <Field
                    className={style.inp}
                    type="text"
                    autoComplete="off"
                    id="name"
                    name="name"
                    placeholder="task name..."
                  />
                  {touched.name && !values.name ? (
                    <div className={style.warning}>is required</div>
                  ) : null}

                  <Field
                    component="select"
                    id="priority"
                    name="priority"
                    className={style.select__item}
                  >
                    <option value="lowest">Lowest</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="highest">Highest</option>
                  </Field>
                  <DatePicker
                    name="dpStart"
                    className={style.dp}
                    selected={dateWasMade}
                    onChange={(date) => setDateStart(date)}
                  />
                  <DatePicker
                    name="dpFinished"
                    className={style.dp}
                    selected={dateFinish}
                    onChange={(date) => setDateFinish(date)}
                  />
                  <Field
                    id="description"
                    name="description"
                    rows="6"
                    component="textarea"
                    className={style.field__item}
                    placeholder="text name..."
                  />
                  {touched.description && !values.description ? (
                    <div className={style.warning}>is required</div>
                  ) : null}
                  <div className={style.closeWindow}>
                    <div className={style.input}>
                      <input name="closeWindow" type={'checkbox'} />
                    </div>
                    <div>
                      <label htmlFor="closeWindow">don't close the window</label>
                    </div>
                  </div>
                  <button
                    disabled={!values.name || !values.description}
                    className={
                      !values.name || !values.description
                        ? style.field__itemBtn_disabled
                        : style.field__itemBtn
                    }
                    type="submit"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
