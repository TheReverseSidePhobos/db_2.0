import Link from 'next/link';
import {useTypedSelector} from '../hooks/useTypedSelector';
import { logout } from '../../store/actions/actions';
import { useDispatch } from 'react-redux';
import style from './HeaderNav.module.scss';
import Button from '../Button/Button';

const HeaderNav : React.FC = () => {
    
    const {isAuth, user, loading} = useTypedSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const logoutHandler = () => {
    //   dispatch(logout());
    }

    loading && <div>Loading...</div>
    return (
        <nav className={style.nav}>
            {/* <Burger /> */}
            <div className={style.list}>
                <div className={style.navLinks}>
                    <ul>
                        <li>
                            <Link href={'/'}>
                            <a>
                                Home
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/aboutUs'}>
                            <a>
                                About Us
                            </a>
                            </Link>
                        </li>

                    </ul>

                </div>
                <div className={style.authLinks}>
                    <ul>
                        {
                            isAuth ?
                            <li>
                                <div className={style.logOut}>
                                    <div>You logged in as <span>{user || 'User'}</span></div>
                                    <Button onClick={logoutHandler} className={style.logoutBtn} text={'log out'}/>
                                </div>
                            </li> :
                            <>
                                <li>
                                    <Link href={'/signup'}>
                                    <a>
                                        Register
                                    </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/signin'}>
                                    <a>
                                        Login
                                    </a>
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default HeaderNav