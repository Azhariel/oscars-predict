<script>
    import { getUniqueMovies, getMovieNominations } from "../../stores/MovieStore"
    import { getPoster } from "../../stores/PosterStore"

    const movies = getUniqueMovies()
</script>
<svelte:head>
    <title>Oscars²³</title>
</svelte:head>

<div class="flex flex-wrap p-8 w-auto justify-center">
{#each movies as movie}
  {#await getMovieNominations(movie) then nominations}

<div class="card card-compact w-64 bg-base-100 shadow-xl mx-4 mb-4">
    <figure><img src="{getPoster(movie)}" alt="{movie}" /></figure>
    <div class="card-body">
      <h1 class="card-title">
        {movie}
      </h1>
      <p>Nominated for {nominations.length} {nominations.length == 1 ? 'award' : 'awards'}</p>
      <div class="card-actions justify-end">
        {#each nominations as nomination}
        <div class="tooltip tooltip-primary" data-tip="{nomination.nominated}">
        <div class="badge badge-primary badge-outline badge-sm truncate">{nomination.categories[0]}</div> 
    </div>
        {/each}
      </div>
    </div>
  </div>
  {/await}
{/each}
</div>