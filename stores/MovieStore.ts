import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import movies from '../src/oscars.json'

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

export interface MovieWithCategories {
  movie: string
  categories: string[]
  nominated: string
}

export const movieStore: Writable<CategoryNominees[]> = writable([])

const getMoviesFromJSON = () => {
  const loadedMovies = Object.keys(movies).map((category) => {
    const processedCategory = category
      .toLowerCase()
      .replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const processedNominees = movies[category].NOMINEES.map(
      (nominee: MovieNominee) => {
        return {
          movie: nominee.movie
            .toLowerCase()
            .replace(/(?:^|\s|[-"'([{])+\S/g, (c: string) => c.toUpperCase()),
          nominated: nominee.nominated
            .toLowerCase()
            .replace(/(?:^|\s|[-"'([{])+\S/g, (c: string) => c.toUpperCase()),
        }
      }
    )

    return {
      category: processedCategory,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      nominees: processedNominees,
    }
  })
  movieStore.set(loadedMovies)
}

getMoviesFromJSON()

export const getMovieNominations = (movie: string): MovieWithCategories[] => {
  const nominations: MovieWithCategories[] = []
  movieStore.subscribe((movies) => {
    movies.forEach((category) => {
      category.nominees.forEach((nominee) => {
        if (nominee.movie.toLowerCase() === movie.toLowerCase()) {
          nominations.push({
            movie: nominee.movie,
            categories: [category.category],
            nominated: nominee.nominated,
          })
        }
      })
    })
  })
  return nominations
}

export const getUniqueMovies = (): string[] => {
  const movies: string[] = []
  movieStore.subscribe((categories) => {
    categories.forEach((category) => {
      category.nominees.forEach((nominee) => {
        if (!movies.includes(nominee.movie)) {
          movies.push(nominee.movie)
        }
      })
    })
  })
  return movies
}
