import { Input } from '@/components'

const LoginForm = () => (
	<>
		<Input name='identifier' placeholder='username/e-mail' />
		<Input name='password' placeholder='password' />
	</>
)

export default LoginForm
