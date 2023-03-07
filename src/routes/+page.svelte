<script>
    import everythingPoster from "../images/everything-everywhere-all-at-once.webp"
    import { movieStore } from "../../stores/MovieStore";

    console.log([...$movieStore]);
</script>
<svelte:head>
    <title>Oscars²³</title>
</svelte:head>
<div class="navbar bg-base-100">
    <a href="/" class="btn btn-ghost normal-case text-xl">Oscars²³</a>
</div>
<div class="container">
<div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="{everythingPoster}" alt="Everything Everywhere All at Once" /></figure>
    <div class="card-body">
      <h2 class="card-title">
        Shoes!
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div> 
        <div class="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
</div>