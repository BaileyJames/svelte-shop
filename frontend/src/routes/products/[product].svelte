<script>
    import { page } from '$app/stores';

    import { getContext, onMount } from 'svelte'

    const {slug} = $page.params
    console.log(slug)
    const apiUrl = "http://localhost:4000/api/db"
    let data = []
    const myParam = $page.params.product
    let myData = []

    const fetchData = fetch(`${apiUrl}/${myParam}`).then((response) => response.json()).then((data) => {
        myData = data
        console.log(data)
    }).catch((err) => {console.log("There was an error: ", err)});
  </script>
  
  {#await fetchData}
  <p>fetching...</p>
  {:then}
      {#each myData as d}
      <div class="product-wrapper">
        <div class="product">
            <h1>{d.product}</h1>
            <p>£{d.price}</p>
            <p>Expiration date: {d['expiry date']}</p>
            <img src="{d.images}" alt="the thing"/>
        </div>
      </div>
          
          
      {/each}
  {:catch error}
      <p>Error: {error.message}</p>
{/await}
<style>
    .product-wrapper {
        display: grid;
    }
    /* .product {
        
    } */
</style>