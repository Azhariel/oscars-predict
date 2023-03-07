import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import movies from '../static/oscars.json'

export interface Movies {
  'ACTOR IN A LEADING ROLE': Movie
  'ACTOR IN A SUPPORTING ROLE': Movie
  'ACTRESS IN A LEADING ROLE': Movie
  'ACTRESS IN A SUPPORTING ROLE': Movie
  'ANIMATED FEATURE FILM': Movie
  CINEMATOGRAPHY: Movie
  'COSTUME DESIGN': Movie
  DIRECTING: Movie
  'DOCUMENTARY FEATURE FILM': Movie
  'DOCUMENTARY SHORT FILM': Movie
  'FILM EDITING': Movie
  'INTERNATIONAL FEATURE FILM': Movie
  'MAKEUP AND HAIRSTYLING': Movie
  'MUSIC (ORIGINAL SCORE)': Movie
  'MUSIC (ORIGINAL SONG)': Movie
  'BEST PICTURE': Movie
  'PRODUCTION DESIGN': Movie
  'SHORT FILM (ANIMATED)': Movie
  'SHORT FILM (LIVE ACTION)': Movie
  SOUND: Movie
  'VISUAL EFFECTS': Movie
  'WRITING (ADAPTED SCREENPLAY)': Movie
  'WRITING (ORIGINAL SCREENPLAY)': Movie
}

export interface Movie {
  NOMINEES: MovieNominee[]
}

export interface MovieNominee {
  movie: string
  nominated: string
  song?: string
}

export interface CategoryNominees {
  category: string
  nominees: MovieNominee[]
}

export const movieStore: Writable<CategoryNominees[]> = writable([])

const getMoviesFromJSON = () => {
  const loadedMovies = Object.keys(movies).map((category) => {
    return {
      category,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      nominees: movies[category].NOMINEES,
    }
  })
  movieStore.set(loadedMovies)
}

getMoviesFromJSON()
