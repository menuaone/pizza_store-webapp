import { Await, Link, useLoaderData } from 'react-router-dom';
import { Product as Products } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import styles from './Product.module.css';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function Product() {
    // const { id } = useParams();
    const data = useLoaderData() as { data: Products };
    const dispatch = useDispatch<AppDispatch>();

    const dt = data.data;

    // const { ingredients } = dt;

    const ff = () => {
        console.log(dt);
    };

    ff();

    return (
        <>
            <Suspense fallback={'Загружаю...'}>
                <Await resolve={data.data}>
                    {({ data }: { data: Products }) => (
                        <>
                            <div className={styles['header']}>
                                <div className={styles['header-flex-left']}>
                                    <Link
                                        to={`/`}
                                        className={styles['get-back-link']}
                                    >
                                        <img src='/arrow.svg' alt='' />
                                    </Link>
                                    <Headling>{data.name}</Headling>
                                </div>

                                <Button
                                    className={styles['add-to-cart']}
                                    onClick={() => {
                                        dispatch(cartActions.add(data.id));
                                    }}
                                >
                                    <img
                                        src='/cart-button-icon.svg'
                                        alt='отправить в корзину'
                                    />
                                    В корзину
                                </Button>
                            </div>

                            <div className={styles['body']}>
                                <div className={styles['body-flex-left']}>
                                    <div
                                        className={styles['product-image']}
                                        style={{
                                            backgroundImage: `url(${data.image})`,
                                        }}
                                    ></div>
                                </div>
                                <div className={styles['body-flex-right']}>
                                    <div className={styles['price']}>
                                        <div className={styles['text']}>
                                            Цена
                                        </div>
                                        <div className={styles['price-value']}>
                                            {data.price}&nbsp;
                                            <span
                                                className={styles['currency']}
                                            >
                                                ₽
                                            </span>
                                        </div>
                                    </div>
                                    <hr className={styles['hr']} />
                                    <div className={styles['rating']}>
                                        <div className={styles['text']}>
                                            Рейтинг
                                        </div>
                                        <div className={styles['rating-value']}>
                                            {data.rating}&nbsp;
                                            <img
                                                src='/star-icon.svg'
                                                alt='Рейтинг'
                                            />
                                        </div>
                                    </div>

                                    <div className={styles['description']}>
                                        <div className={styles['text']}>
                                            Состав:
                                        </div>
                                        <div
                                            className={
                                                styles['description-value']
                                            }
                                        >
                                            {data.ingredients.join(', ')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Await>
            </Suspense>
        </>
    );
}
