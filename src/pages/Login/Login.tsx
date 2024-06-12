import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

export function Login() {
    const [error, setError] = useState<string | null>();

    const submitLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };

    const sendLogin = async (email: string, password: string) => {
        try {
            const { data } = await axios.post(`${PREFIX}/auth/login`, {
                email,
                password,
            });
            console.log(data);
        } catch (e) {
            // имеется в виду, что ошибка пришла от AXIOS
            if (e instanceof AxiosError) {
                setError(e.response?.data.message);
            }
        }
    };

    return (
        <div className={styles['login']}>
            <Headling>Вход</Headling>
            {error && <div className={styles['error']}>{error}</div>}
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
