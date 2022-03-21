import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Modal/Modal';
import SideBar from '../components/SideBar';
import style from '../components/SideBar/SideBar.module.scss';
import {useTypedSelector} from '../components/hooks/useTypedSelector';

const Home: NextPage = () => {
  const {modalShow} = useTypedSelector((state) => state.task);
  return (
    <Layout>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <title>T.M.</title>
      </Head>
      <main>
        <div className={style.sidebar}>
          <SideBar />
        </div>
        
        {
          modalShow && 
          <Modal/>
        }
      </main>
    </Layout>
  );
};

export default Home;
