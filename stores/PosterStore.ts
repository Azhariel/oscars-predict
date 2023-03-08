import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { getUniqueMovies } from './MovieStore'

export interface Poster {
    movie: string
    url: string
}

const movies = getUniqueMovies()
export const posterStore: Writable<Poster[]> = writable([])

const setPosterStore = () => {
    const posters: Poster[] = []
    movies.forEach((movie) => {
        const path = `../src/images/${movie}.jpg`.replace('?','').replace(':','')
        const url = new URL(path, import.meta.url).href
        posters.push({ movie, url })
    })
    posterStore.set(posters)
}
setPosterStore()
    

export const getPoster = (movie: string): string => {
    let poster = ''
    posterStore.subscribe((posters) => {
        posters.forEach((p) => {
            if (p.movie.toLowerCase() === movie.toLowerCase()) {
                poster = p.url
            }
        })
    })
    return poster
}