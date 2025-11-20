export interface Movie {
    id: number,
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    original_languaje: string,
    original_title: string,
    overview: string,
    popularity: string,
    poster_path: string,
    release_date: Date,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    isFavorite: boolean
}

export interface ApiMovieResponse {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}