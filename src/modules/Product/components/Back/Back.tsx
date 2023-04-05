import { useNavigate } from 'react-router-dom'

import classes from './Back.module.scss'

const Back = () => {
	const navigate = useNavigate()

	const onGoMainPageHandler = () => {
		navigate('/')
	}

	return (
		<p onClick={onGoMainPageHandler} className={classes.back}>
			Go back
		</p>
	)
}

export default Back
