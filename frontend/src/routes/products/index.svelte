<script>
import { onMount } from "svelte";
import style from "../../styles/products.css"
    let myData = []

    const fetchData = fetch("http://localhost:4000/api/db").then((response) => response.json()).then((data) => {
        myData = data
        console.log(data)
    }).catch((err) => {console.log("There was an error: ", err)});

    export let user;
    export let search = false;
    export let products = [];
</script>
<svelte:head>
    <title>The Ultimate Food Store | CoolShop.com</title>
    <meta name="description" content="Shop for great quality food from CoolShop.com. We sell the most fresh, organic food money can buy. Enjoy great prices, astounding customer service and next day delivery all over the UK. " />
    <link rel="canonical" href="http://www.coolshop.com"/>
    <meta name="keywords" content="Banana, Rice, Chocolate, Curry, Pasta, Cream">
</svelte:head>

<div class="container">
<form method="get" action={`http://localhost:3000/${user == "admin"? "admin/":""}products/search/`}>
    <label for="product">Search product</label>
    <input type="text" id="product" name="product" required="yes">
    <input type="submit" value="Submit">
</form>

{#await fetchData}
    <p>fetching...</p>
    {:then}
    <div class="product-wrapper">
        {#if search===true && products.length > 0}
            {#each products as d}
            <div class="product">
                <div class="content">
                    <div class="image">
                        <img src="{d.img}" alt="{d.product}" class="product-image">
                    </div>
                    <div class="text">
                        <h1>{d.product}</h1>
                        <p>£{d.price}</p>
                    </div>
                </div>
            </div>
            {/each}
            {:else}
            {#each myData as d}

            <div class="product">
                <div class="content">
                    <div class="image">
                        <img src="{d.img}" alt="{d.product}" class="product-image">
                    </div>
                    <div class="text">
                        <h1>{d.product}</h1>
                        <p>£{d.price}</p>
                    </div>
                </div>
            </div>
            {/each}
        {/if}
        

        
    </div>
        
    {:catch error}
        <p>Error: {error.message}</p>
{/await}

</div>
