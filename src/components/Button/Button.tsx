import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({
    children,
    appearence = 'small',
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(styles['button'], styles['accent'], className, {
                [styles['small']]: appearence === 'small',
                [styles['big']]: appearence === 'big',
            })}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
