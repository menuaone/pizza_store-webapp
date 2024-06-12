import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
// import { useEffect } from 'react';
import cn from 'classnames';

export function Layout() {
    // const location = useLocation();

    // useEffect(() => {
    //     console.log(location);
    // }, [location]);

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['user']}>
                    <img
                        className={styles['avatar']}
                        src='/public/avatar.png'
                        alt='avatar'
                    />
                    <div className={styles['name']}>Антон Ларичев</div>
                    <div className={styles['email']}>alari@ya.ru</div>
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
                        <img src='/public/menu-icon.svg' alt='menu-icon' />
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
                        <img src='/public/cart-icon.svg' alt='cart-icon' />
                        Корзина
                    </NavLink>
                </div>
                <Button className={styles['exit']}>
                    <img src='/public/logoutlogo.svg' alt='exit' />
                    Выход
                </Button>
            </div>

            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}
