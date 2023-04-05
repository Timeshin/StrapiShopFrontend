export interface IProduct {
	id: number
	title: string
	price: string
	image?: IImgeResponse
	publishedAt: string
	updatedAt: string
	createdAt: string
}

export interface IImgeResponse {
	id: number
	name: string
	formats: {
		[key: string]: {
			[key: string]: string | number
		}
	}
	url: string
}
