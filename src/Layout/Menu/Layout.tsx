import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

export function Layout() {
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
                    <Link to='/' className={styles['link']}>
                        <img src='/public/menu-icon.svg' alt='menu-icon' />
                        Меню
                    </Link>
                    <Link to='/Cart' className={styles['link']}>
                        <img src='/public/cart-icon.svg' alt='cart-icon' />
                        Корзина
                    </Link>
                </div>
                <Button className={styles['exit']}>
                    <img src='/public/logoutlogo.svg' alt='exit' />
                    Выход
                </Button>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    );
}
