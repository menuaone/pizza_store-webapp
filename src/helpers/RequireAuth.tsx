import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { rootState } from '../store/store';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    // useSelector можем сделать конкретный ограниченный запрос и получить JWT token
    const jwt = useSelector((s: rootState) => s.user.jwt);

    if (!jwt) {
        return <Navigate to='/auth/login' replace />;
    }
    return children;
};
