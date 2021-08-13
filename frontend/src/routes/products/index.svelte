<script>
import { onMount } from "svelte";

    let myData = []

    const fetchData = fetch("http://localhost:4000/api/db").then((response) => response.json()).then((data) => {
        myData = data
        console.log(data)
    });

    
</script>
<h1>HEllo</h1>
{#await fetchData}
    <p>fetching...</p>
    {:then}
        {#each myData as d}
            <div class="product">
                <a href="/products/{d.product}">
                    <h1>{d.product}</h1>
                    <p>£{d.price}</p>
                    <p>Expiration date: {d['expiry date']}</p>
                </a>
                </div>
            
        {/each}
    {:catch error}
        <p>Error: {error.message}</p>
{/await}

<style>
    .product {
        background-color: grey;
    }
    .product a {
        color: black;
        text-decoration: none;
    }
</style>

