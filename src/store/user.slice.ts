import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import { Profile } from '../interfaces/user.profile';
import { rootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistantState {
    jwt: string | null;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string;
    regErrorMessage?: string;
    profile?: Profile;
}

const initialState: UserState = {
    jwt: loadState<UserPersistantState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

// асинхронные данные в redux - работа с промисами, login в приложении
export const login = createAsyncThunk(
    'user/login',
    async (params: { email: string; password: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(
                `${PREFIX}/auth/login`,
                {
                    email: params.email,
                    password: params.password,
                }
            );
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);

// получение данных профиля, get запрос
export const userProfile = createAsyncThunk<
    Profile,
    void,
    { state: rootState }
>('user/profile', async (_, thunkApi) => {
    // получение токена через thunkApi
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return data;
});

// регистрация пользователя, post запрос
export const register = createAsyncThunk(
    'auth/register',
    async (params: { email: string; password: string; name: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(
                `${PREFIX}/auth/register`,
                {
                    email: params.email,
                    password: params.password,
                    name: params.name,
                }
            );
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },
        clearRegisterError: (state) => {
            state.regErrorMessage = undefined;
        },
    },
    extraReducers: (builder) => {
        // случай успешного получения токена ( из createAsyncThunk выше)
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        // случай ошибки получения токена ( из createAsyncThunk выше)
        builder.addCase(login.rejected, (state, action) => {
            // тут будет лежать ошибка из AxiosError
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(userProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.regErrorMessage = action.error.message;
        });
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
