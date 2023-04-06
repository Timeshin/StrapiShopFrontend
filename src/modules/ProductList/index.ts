import ProductsList from './components/ProductsList/ProductsList'
import productsSlice from './redux/products.slice'
import { IProduct } from '../../types/services/productsService.types'
import productMiddleware from './redux/products.middleware'

export { ProductsList, productsSlice, productMiddleware }

export type { IProduct }
