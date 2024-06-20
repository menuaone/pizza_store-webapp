import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, rootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    };
};

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, regErrorMessage } = useSelector((s: rootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submitRegister = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        dispatch(
            register({
                email: email.value,
                password: password.value,
                name: name.value,
            })
        );
    };

    return (
        <div className={styles['register']}>
            <Headling>Регистрация</Headling>
            {regErrorMessage && (
                <div className={styles['error']}>{regErrorMessage}</div>
            )}
            <form className={styles['reg-form']} onSubmit={submitRegister}>
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
                <div className={styles['field']}>
                    <label htmlFor='name'>Ваше имя</label>
                    <Input name='name' id='name' placeholder='Имя'></Input>
                </div>
                <Button appearence='big'>Зарегистрироваться</Button>
            </form>
            <div className={styles['links']}>
                <div>Eсть аккаунт?</div>
                <div>
                    <Link to='/auth/login'>Войти</Link>
                </div>
            </div>
        </div>
    );
}
