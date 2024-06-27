import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
// import { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, rootState } from '../../store/store';
import { userActions, userProfile } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: rootState) => s.user.profile);
    const items = useSelector((s: rootState) => s.cart.items);

    // const location = useLocation();

    // useEffect(() => {
    //     console.log(location);
    // }, [location]);

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    const logout = () => {
        // localStorage.removeItem('jwt');

        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['user']}>
                    <img
                        className={styles['avatar']}
                        src='/avatar.png'
                        alt='avatar'
                    />
                    <div className={styles['name']}>Мэнуа Агамиров</div>
                    <div className={styles['email']}>{profile?.email}</div>
                    <div className={styles['email']}>{profile?.address}</div>
                </div>
                <div className={styles['menu']}>
                    {/* ссылка, котороая выбрана, будет подсвечиваться */}
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive,
                            })
                        }
                    >
                        <img src='/menu-icon.svg' alt='menu-icon' />
                        Меню
                    </NavLink>

                    <NavLink
                        to='/Cart'
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive,
                            })
                        }
                    >
                        <img src='/cart-icon.svg' alt='cart-icon' />
                        Корзина
                        <span className={styles['cart-count']}>
                            {' '}
                            {items.reduce(
                                (acc, item) => (acc += item.count),
                                0
                            )}
                        </span>
                    </NavLink>
                </div>

                <Button className={styles['exit']} onClick={logout}>
                    <img src='/logoutlogo.svg' alt='exit' />
                    Выход
                </Button>
            </div>

            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}
