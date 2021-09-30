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
  <svelte:head>
    <title>{myParam} | CoolShop.com | Shop for {myParam}s at CoolShop.com</title>
    <link rel="canonical" href="http://www.coolshop.com"/>
    {#await fetchData}
    {:then} 
    <meta name="description" content="{myData[0].product}"/>
    <meta name="keywords" content="{myData[0].keywords}"/>
    {/await}
    <meta name="keywords" content="">
</svelte:head>

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