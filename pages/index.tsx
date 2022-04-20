import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import SideBar from '../components/SideBar';
import style from '../components/SideBar/SideBar.module.scss';
import { useTypedSelector } from '../components/hooks/useTypedSelector';
import Column from '../components/Column';
import React, { useCallback, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { add_to_redux_from_db, updateTasks } from '../store/actions/actions';
import Alert from '../components/Alert';
import Cookies from 'js-cookie';
import SwiperComponent from '../components/Swiper';
import Up_arrow from '../public/up_arrow.svg';
import Image from 'next/image';
import { alertShowAC } from '../store/actions/actions';
import dynamic from 'next/dynamic';
// const Modal = React.lazy(() => import('../components/Modal'));
// import Modal from '../components/Modal';
const Modal = dynamic(() => import('../components/Modal'))
// import { Autoplay } from 'swiper';
// import Swiper, { Navigation, Pagination } from 'swiper';
// import 'swiper/css';
// Swiper.use([Navigation, Pagination]);
// Swiper.use([Autoplay]);

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.API_HOST}/example`);
    const data = await res.json();
    if (!data) {
      return {
        notFound: true
      };
    }
    return { props: { data } };
  } catch (error) {
    return { props: null };
  }
  // TODO: add try catch
}
const Home: React.FC<any> = ({ data }) => {
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

  const mySortingSwitch = (option: string, tasks: any) => {
    let sorted;
    switch (option) {
      case 'By Priority ASC':
        sorted = tasks.sort((a: any, b: any) =>
          a.priorityNum < b.priorityNum ? 1 : -1
        );
        break;
      case 'By Priority DESC':
        sorted = tasks.sort((a: any, b: any) =>
          a.priorityNum > b.priorityNum ? 1 : -1
        );
        break;
      case 'By Date ASC':
        sorted = tasks.sort((a: any, b: any) =>
          a.dateWasMade < b.dateWasMade ? 1 : -1
        );
        break;
      case 'By Date DESC':
        sorted = tasks.sort((a: any, b: any) =>
          a.dateWasMade > b.dateWasMade ? 1 : -1
        );
        break;
      default:
        break;
    }
    return sorted;
  };

  const handleSorting = (option: any, position: any) => {
    if (position === 'New Tasks') {
      let sorted = mySortingSwitch(option, newTasks);

      dispatch(updateTasks(sorted, position));
      let sortedTasks = JSON.stringify(sorted);
      Cookies.set('newTasks', sortedTasks);
    }

    if (position === 'In Progress') {
      let sorted = mySortingSwitch(option, inProgressTasks);
      dispatch(updateTasks(sorted, position));
      let sortedTasks = JSON.stringify(sorted);
      Cookies.set('inProgressTasks', sortedTasks);
    }
    if (position === 'Done') {
      let sorted = mySortingSwitch(option, doneTasks);
      dispatch(updateTasks(sorted, position));
      let sortedTasks = JSON.stringify(sorted);
      Cookies.set('doneTasks', sortedTasks);
    }
  };

  // setTimeout(() => {
  //   new Swiper('.swiper', {
  //     loop: true,
  //     speed: 3000,
  //     slidesPerView: 1,
  //     spaceBetween: 30,
  //     autoplay: {
  //       disableOnInteraction: true
  //     },
  //     effect: 'fade'
  //   });

  // }, 500);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handlerScroll);
    return () => {
      window.removeEventListener('scroll', handlerScroll);
    };
  }, []);

  const handlerScroll = (e: any) => {
    if (window.pageYOffset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const goUpHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const clickhandler = (e: any) => {
    if (!e.target.className.includes('content')) {
      dispatch(alertShowAC(false))
    }
  };
  return (
    <Layout>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <title>T.M.</title>
      </Head>
      <div onClick={(e) => clickhandler(e)}>
        {alertShow && <Alert type="success" text="Save was successful" />}
      </div>
      {/* {true && <Alert type="error" text="something went wrong" />} */}
      {/* {true && <Alert type="attention" text="attention" />} */}

      {scrolled && (
        <div className="upArrow" onClick={goUpHandler}>
          <Image width={50} height={50} src="/up_arrow.svg" alt="up_arrow" />
        </div>
      )}
      <div className="swiper__title">
        <strong>Try Our App Right Now</strong>
      </div>
      <div className="mainContainerSwiper">
        <div>
          <img className="img" src={'/clipboard.png'} />
        </div>
        <SwiperComponent data={data} />
        {/* <div className="swiper swiper__container">
          <div className="titleSwiper">Try to use our app</div>
          <div className="swiper-wrapper">
            {data &&
              data.map((item: any) => (
                <div key={item.id} className="swiper-slide">
                  <div className="swiperInfo">
                    <div className="dataInfo">
                      <div className='dataInfo__title'>{item.name}</div>
                      <div className='dataInfo__description'>{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-scrollbar"></div>
        </div> */}
      </div>

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
        {/* {
          modalShow && <Modal />
        } */}
        {modalShow && <Modal />}
        {/* {infoModalShow && <Modal />} */}
      </main>
    </Layout>
  );
};

export default Home;
