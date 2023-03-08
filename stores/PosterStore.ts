import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { getUniqueMovies } from './MovieStore'
const images = import.meta.glob('../src/images/*.jpg', { eager: true, as: 'url' })
export interface Poster {
    movie: string
    url: string
}

const movies = getUniqueMovies()
export const posterStore: Writable<Poster[]> = writable([])

const setPosterStore = () => {
    const posters: Poster[] = []
    const regex = /\/([A-z,0-9. \u00C0-\u00FF]+)+\./g
    movies.forEach(async (movie) => {
        Object.entries(images).forEach((image) => {
            const match = [...image[0].matchAll(regex)]
            if (match[0][1]) {
                const filename = match[0][1].replace('?', '').replace(':', '').replace("'", "")
                if (filename.toLowerCase() === movie.toLowerCase().replace('?', '').replace(':', '').replace("'", "")) {
                    posters.push({ movie, url: image[1] })
                }
            }
        })
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