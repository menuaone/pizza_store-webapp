import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
    // получение продуктов
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    // состояние поиска
    const [filter, setFilter] = useState<string>();

    // срабатывает при монтировании компонента, а также работает фильтр
    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    // использование axios
    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            // установлен загрузчик на 2 секунды
            // await new Promise<void>((resolve) => {
            //     setTimeout(() => {
            //         resolve();
            //     }, 2000);
            // });
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                    name,
                },
            });
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            // проверка на ошибку, тк в catch e приходит как uknown
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }

        // стандартный fetch запрос
        // try {
        //     const res = await fetch(`${PREFIX}/products`);
        //     if (!res.ok) {
        //         return;
        //     }
        //     const data = (await res.json()) as Product[];
        //     setProducts(data);
        // } catch (e) {
        //     console.error(e);
        //     return;
        // }
    };

    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search
                    placeholder='Введите блюдо или состав'
                    onChange={updateFilter}
                />
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && products.length > 0 && (
                    <MenuList products={products} />
                )}
                {isLoading && <>Идет загрузка продуктов...</>}
                {!isLoading && products.length === 0 && (
                    <>Не найдено блюд по запросу</>
                )}
            </div>
        </>
    );
}

export default Menu;
