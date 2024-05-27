import { ButtonHTMLAttributes, ReactNode } from 'react';

// используя такой подход мы сразу можем использовать напрмер onClick
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    appearence?: 'big' | 'small';
}
