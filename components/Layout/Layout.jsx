import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './Layout.module.scss';

const Layout = ({children}) => {
  return (
    <div className={style.main__wrapper}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.main}>
            {children}
        </div>
        <div className={style.footer}>
            <Footer/>
        </div>
    </div>

  )
}

export default Layout