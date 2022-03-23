// import Burger from './Burger/Burger';

import HeaderNav from '../HeaderNav/HeaderNav';
import style from './Header.module.scss';

const Header: React.FC = () => {
  

  
  return (
    <header className={style.header}>
        <div className={style.headerWrapper}>
            <HeaderNav/>
        </div>
    </header>
  );
};

export default Header;