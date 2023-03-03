import { Routes, Route } from 'react-router-dom'

import './App.scss'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import RequireAuth from './components/Auth/RequireAuth'
import NotFound from './components/HTTPCodes/NotFound'
import Layout from './components/Layout/Layout'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Products from './components/Products/Products'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<RequireAuth />}>
                        <Route path="/" element={<Products />} />
                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}

export default App
