<script>
import { onMount } from "svelte";

    let myData = []

    const fetchData = fetch("http://localhost:4000/api/db").then((response) => response.json()).then((data) => {
        myData = data
        console.log(data)
    }).catch((err) => {console.log("There was an error: ", err)});

    export let user;
</script>

<form method="get" action={`http://localhost:3000/${user == "admin"? "admin/":""}products/search/`}>
    <label for="product">Search product</label>
    <input type="text" id="product" name="product" required="yes">
    <input type="submit" value="Submit">
</form>

{#await fetchData}
    <p>fetching...</p>
    {:then}
    <div class="product-wrapper">
        {#each myData as d}
        
            <div class="product">
                <a href={`${user == "admin"? "/admin":""}/products/${d.product}`}>
                    <h1>{d.product}</h1>
                    <p>£{d.price}</p>
                    <p>Expiration date: {d['expiry date']}</p>
                </a>
                {#if user == "admin"}
                    <a href={`/admin/products/${d.product}`}>Click to edit component</a>
                {/if}
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
