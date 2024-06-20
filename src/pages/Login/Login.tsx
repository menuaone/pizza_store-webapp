import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, rootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, loginErrorMessage } = useSelector((s: rootState) => s.user);

    // отслеживаем появление jwt токена
    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submitLogin = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return (
        <div className={styles['login']}>
            <Headling>Вход</Headling>
            {loginErrorMessage && (
                <div className={styles['error']}>{loginErrorMessage}</div>
            )}
            <form className={styles['login-form']} onSubmit={submitLogin}>
                <div className={styles['field']}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input id='email' name='email' placeholder='Email'></Input>
                </div>
                <div className={styles['field']}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input
                        name='password'
                        id='password'
                        type='password'
                        placeholder='Пароль'
                    ></Input>
                </div>
                <Button appearence='big'>Вход</Button>
            </form>
            <div className={styles['links']}>
                <div>Нет аккаунта?</div>
                <div>
                    <Link to='/auth/register'>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
}
