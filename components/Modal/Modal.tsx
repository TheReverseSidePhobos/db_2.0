import React, { useEffect, useState } from 'react';
import style from './Modal.module.scss';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
// import * as types from '../../redux/actions/types';
import { useSelector } from 'react-redux';
// import { saveStartDate, saveTask } from '../../redux/actions/actions';
import { useTypedSelector } from '../../components/hooks/useTypedSelector';
import { Formik, Field, Form } from 'formik';
import { toggleModal } from '../../store/actions/actions';
import { setFinishDate, setStartDate, saveTask} from '../../store/actions/actions';

import 'react-datepicker/dist/react-datepicker.css';

const Modal = () => {
  const dispatch = useDispatch();

  const { dateFinish, dateWasMade, tasks } = useTypedSelector(
    (state) => state.task
  );

  const handleCloseModal = () => {
    dispatch(toggleModal());
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
    dispatch(saveTask(task));
  };
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
                debugger;
                let task = {
                  id: tasks.length,
                  name,
                  description,
                  priority,
                  dateWasMade,
                  position: 'new',
                  dateFinish,
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
                  <label htmlFor="" />
                  <input name="" type={'checkbox'} />
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
