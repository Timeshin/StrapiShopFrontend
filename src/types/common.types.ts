export interface IStatus {
	status: 'error' | 'loading' | 'success' | 'initial'
	message?: string[] | string
}

export interface IError {
	error: {
		status: number
		name: string
		message: string
		details?: IDetailsError
	}
}

interface IDetailsError {
	errors: {
		path: [string]
		message: string
		name: string
	}[]
}
