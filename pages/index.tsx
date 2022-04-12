import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Modal/Modal';
import SideBar from '../components/SideBar';
import style from '../components/SideBar/SideBar.module.scss';
import { useTypedSelector } from '../components/hooks/useTypedSelector';
import Column from '../components/Column/Column';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { add_to_redux_from_db, updateTasks } from '../store/actions/actions';
import Alert from '../components/Alert/Alert';
import { compare } from '../utils/ustils';
import Cookies from 'js-cookie';

const Home: NextPage = () => {
  const {
    modalShow,
    newTasks,
    inProgressTasks,
    doneTasks,
    infoModalShow,
    alertShow
  } = useTypedSelector((state) => state.task);

  let tasks = [...newTasks, ...inProgressTasks, ...doneTasks];

  const dispatch = useDispatch();
  useEffect(() => {
    let objNew = Cookie.get('newTasks');
    if (objNew) {
      let jsonObj = JSON.parse(objNew);

      jsonObj.forEach((el: any) => {
        let isInRedux = tasks.find((task) => task.id == el.id);
        if (!isInRedux) {
          dispatch(add_to_redux_from_db(el));
        }
      });
    }

    let objProgress = Cookie.get('inProgressTasks');
    if (objProgress) {
      let jsonObj = JSON.parse(objProgress);

      jsonObj.forEach((el: any) => {
        let isInRedux = tasks.find((task) => task.id == el.id);
        if (!isInRedux) {
          dispatch(add_to_redux_from_db(el));
        }
      });
    }

    let objDone = Cookie.get('doneTasks');
    if (objDone) {
      let jsonObj = JSON.parse(objDone);

      jsonObj.forEach((el: any) => {
        let isInRedux = tasks.find((task) => task.id == el.id);
        if (!isInRedux) {
          dispatch(add_to_redux_from_db(el));
        }
      });
    }
  }, []);

  // const [equalArr, setEqualArr] = useState();

  // useEffect(() => {
  //   let obj = Cookie.get('tasks');
  //   if (obj) {
  //     let jsonObj = JSON.parse(obj);

  //     let isEqual = setEqualArr(compare(tasks, jsonObj));
  //     console.log('equalArr: ', isEqual);
  //   }
  // }, []);
  // const mySortInSwitch = () => {

  // }

  const handleSorting = (option: any, position: any) => {
    if (position === 'New Tasks') {
      let sorted;
      switch (option) {
        case 'By Priority ASC':
          sorted = newTasks.sort((a, b) =>
            a.priorityNum < b.priorityNum ? 1 : -1
          );
          break;
        case 'By Priority DESC':
          sorted = newTasks.sort((a, b) =>
            a.priorityNum > b.priorityNum ? 1 : -1
          );
          break;
        case 'By Date ASC':
          sorted = newTasks.sort((a, b) =>
            a.dateWasMade < b.dateWasMade ? 1 : -1
          );
          break;
        case 'By Date DESC':
          sorted = newTasks.sort((a, b) =>
            a.dateWasMade > b.dateWasMade ? 1 : -1
          );
          break;
        default:
          break;
      }
      dispatch(updateTasks(sorted, position));
      let sortedTasks = JSON.stringify(sorted);
      Cookies.set('newTasks', sortedTasks);
    }

    if (position === 'In Progress') {
      let sorted;
      switch (option) {
        case 'By Priority ASC':
          sorted = inProgressTasks.sort((a, b) =>
            a.priorityNum < b.priorityNum ? 1 : -1
          );
          break;
        case 'By Priority DESC':
          sorted = inProgressTasks.sort((a, b) =>
            a.priorityNum > b.priorityNum ? 1 : -1
          );
          break;
        case 'By Date ASC':
          sorted = inProgressTasks.sort((a, b) =>
            a.dateWasMade < b.dateWasMade ? 1 : -1
          );
          break;
        case 'By Date DESC':
          sorted = inProgressTasks.sort((a, b) =>
            a.dateWasMade > b.dateWasMade ? 1 : -1
          );
          break;

        default:
          break;
      }
      dispatch(updateTasks(sorted, position));
      let sortedTasks = JSON.stringify(sorted);
      Cookies.set('inProgressTasks', sortedTasks);
    }
    if (position === 'Done') {
      let sorted;
      switch (option) {
        case 'By Priority ASC':
          sorted = doneTasks.sort((a, b) =>
            a.priorityNum < b.priorityNum ? 1 : -1
          );
          break;
        case 'By Priority DESC':
          sorted = doneTasks.sort((a, b) =>
            a.priorityNum > b.priorityNum ? 1 : -1
          );
          break;
        case 'By Date ASC':
          sorted = doneTasks.sort((a, b) =>
            a.dateWasMade < b.dateWasMade ? 1 : -1
          );
          break;
        case 'By Date DESC':
          sorted = doneTasks.sort((a, b) =>
            a.dateWasMade > b.dateWasMade ? 1 : -1
          );
          break;

        default:
          break;
      }
      dispatch(updateTasks(sorted, position));
      let sortedTasks = JSON.stringify(sorted);
      Cookies.set('doneTasks', sortedTasks);
    }
  };

  return (
    <Layout>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <title>T.M.</title>
      </Head>
      {alertShow && <Alert />}
      <main className="page container">
        <div className={style.sidebar}>
          <SideBar />
        </div>

        <div className="columns">
          <Column
            position="new"
            inner_tasks={newTasks}
            handleSorting={handleSorting}
          />
          <Column
            position="progress"
            inner_tasks={inProgressTasks}
            handleSorting={handleSorting}
          />
          <Column
            position="done"
            inner_tasks={doneTasks}
            handleSorting={handleSorting}
          />
        </div>
        {modalShow && <Modal />}
        {infoModalShow && <Modal />}
      </main>
    </Layout>
  );
};

export default Home;
