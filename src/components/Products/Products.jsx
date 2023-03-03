import { useContext, useEffect, useReducer, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker'

import AuthContext from '../../context/AuthProvider'
import TitleChangeContext from '../../context/TitleChangeProvider'
import { handleDataFromAPI } from '../../helpers/api'
import Loader from '../Loader/Loader'
import Search from '../Search/Search'
import Product from '../Product/Product'
import ProductFilters from '../ProductFilters/ProductFilters'

import './Products.scss'

const initialState = {
    category: undefined,
    price: undefined,
    subcategory: undefined,
    search: '',
}

function reducer(state, action) {
    switch (action.type) {
        case 'category':
            return { ...state, category: action.payload }
        case 'price':
            return { ...state, price: action.payload }
        case 'subcategory':
            return { ...state, subcategory: action.payload }
        default:
            return state
    }
}

function Products() {
    const { auth } = useContext(AuthContext)
    const { setTitle } = useContext(TitleChangeContext)
    const navigate = useNavigate()
    const location = useLocation()

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [filters, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        setTitle('Products')
    }, [])

    useEffect(() => {
        if (!Object.keys(auth).length) {
            navigate('/login', { replace: false, state: { from: location } })
        } else {
            handleDataFromAPI({
                endpoint: 'v1/products',
                credentials: auth.accessToken,
            }).then((response) => setProducts(response))
        }
    }, [search, auth])

    function searchFilter(item) {
        if (search === '') return true
        return item.name.toLowerCase().includes(search.toLowerCase())
    }

    return (
        <>
            <Search
                setSearch={setSearch}
                search={search}
                products={products}
                searchFilter={searchFilter}
            />
            <section>
                {!products.length ? (
                    <Loader fullScreen={true} />
                ) : (
                    <section className="wrapper">
                        <ProductFilters dispatch={dispatch} />
                        <main className="products">
                            {products
                                .filter(
                                    (product) =>
                                        !filters.category ||
                                        product.category === filters.category
                                )
                                .filter(searchFilter)
                                .map(
                                    ({
                                        id,
                                        images,
                                        name,
                                        description,
                                        price,
                                        currency,
                                    }) => (
                                        // TODO - create new component
                                        <Product
                                            key={`${name}-${id}`}
                                            id={id}
                                            images={images}
                                            image={faker.image.cats(
                                                288,
                                                160,
                                                true
                                            )}
                                            name={name}
                                            description={description}
                                            price={price}
                                            currency={currency}
                                        />
                                    )
                                )}
                        </main>
                    </section>
                )}
            </section>
        </>
    )
}

export default Products
