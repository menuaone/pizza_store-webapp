import { Await, useLoaderData } from 'react-router-dom';
import { Product as Products } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export function Product() {
    // const { id } = useParams();
    const data = useLoaderData() as { data: Products };

    return (
        <>
            <Suspense fallback={'Загружаю...'}>
                <Await resolve={data.data}>
                    {({ data }: { data: Products }) => <>Prod - {data.name}</>}
                </Await>
            </Suspense>
        </>
    );
}
