import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loader } from '@/components'
import { AuthLayout, MainPageLayout } from '@/layouts'

const AuthPage = lazy(() => import('@/pages/AuthPage/AuthPage'))
const MainPage = lazy(() => import('@/pages/MainPage/MainPage'))
const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage'))

const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path='/' element={<MainPageLayout />}>
					<Route index element={<MainPage />} />
					<Route path=':productId' element={<ProductPage />} />
				</Route>
				<Route path='auth' element={<AuthPage />} />
			</Route>
		</Routes>
	</Suspense>
)

export default App
