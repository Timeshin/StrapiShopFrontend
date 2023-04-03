import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loader } from '@/components'
import { AuthLayout } from '@/layouts'

const AuthPage = lazy(() => import('@/pages/AuthPage/AuthPage'))

const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route path='/' element={<AuthLayout />}>
				<Route path='auth' element={<AuthPage />} />
			</Route>
		</Routes>
	</Suspense>
)

export default App
