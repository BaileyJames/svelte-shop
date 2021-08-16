<script>
import { onMount } from "svelte";

    let myData = []

    const fetchData = fetch("http://localhost:4000/api/db").then((response) => response.json()).then((data) => {
        myData = data
        console.log(data)
    });

    // fetch("http://localhost:4000/api/db/search?product=Apple")
    // .then(data => {
    //     return data.json
    // })
    // .then(product => {
    //     console.log("hi", product.price)
    // })
</script>
<h1>HEll0</h1>
<form method="get" action="http://localhost:3000/products/search/">
    <label for="product">Search product</label>
    <input type="text" id="product" name="product">
    <input type="submit" value="Submit">
</form>

{#await fetchData}
    <p>fetching...</p>
    {:then}
    <div class="product-wrapper">
        {#each myData as d}
        
            <div class="product">
                <a href="/products/{d.product}">
                    <h1>{d.product}</h1>
                    <p>£{d.price}</p>
                    <p>Expiration date: {d['expiry date']}</p>
                </a>
            </div>
            
            
        {/each}
    </div>
        
    {:catch error}
        <p>Error: {error.message}</p>
{/await}

<style>
    .product-wrapper{
        display: grid;
        grid-template-columns: 1fr 1fr;
        /* grid-template-rows: 1fr 2fr; */
    }
    .product {
        background-color: grey;
        width: 100%;
    }
    .product a {
        color: black;
        text-decoration: none;
    }
</style>

