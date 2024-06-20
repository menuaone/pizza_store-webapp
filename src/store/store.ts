import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';
import cartSlice from './cart.slice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
    },
});

// подписка на ls, в случае обновления будет сохранятся
store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
