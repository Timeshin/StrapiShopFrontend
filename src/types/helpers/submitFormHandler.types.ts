import { FormEvent } from 'react'

export interface ISubmitFormHandler {
	event: FormEvent<HTMLFormElement>
	errorCallback: () => void
	loadingCallback: () => void
}
