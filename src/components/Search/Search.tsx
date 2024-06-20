import styles from './Search.module.css';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import { forwardRef } from 'react';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <div className={styles['input-wrapper']}>
            <input
                ref={ref}
                className={cn(styles['input'], className, {
                    [styles['invalid']]: isValid,
                })}
                {...props}
            />
            <img
                src='search-icon.svg'
                alt='поиск'
                className={styles['search-icon']}
            />
        </div>
    );
});

export default Search;
