import { ISubmitFormHandler } from '@/types/helpers/submitFormHandler.types'

const submitFormHandler = <T>({ event, errorCallback, loadingCallback }: ISubmitFormHandler) => {
	event.preventDefault()

	const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement))
	const formDataValuesArray = Object.values(formData)

	if (formDataValuesArray.some((formValue) => !formValue)) {
		errorCallback()
		return
	}

	loadingCallback()

	return formData as T
}

export default submitFormHandler
