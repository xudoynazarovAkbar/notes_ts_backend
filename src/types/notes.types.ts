export interface INote {
	id: string;
	content: string;
}
export interface IQuery {
	limit?: string;
	page?: string;
	search?: string;
}
export interface IRequestBody {
	content: string;
}
export interface IPagination {
	currentPage: number;
	perPage: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
	totalPages: number;
	totalItems: number;
}
export interface IResponseGetAll {
	data: INote[];
	pagination?: IPagination;
}
