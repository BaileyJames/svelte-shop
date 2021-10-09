<script>
import { onMount } from "svelte";
import style from "../../styles/products.css"
    let myData = []

    const fetchData = fetch("http://localhost:4000/api/db").then((response) => response.json()).then((data) => {
        myData = data
        console.log(data)
    }).catch((err) => {console.log("There was an error: ", err)});

    export let user;
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
        {#each myData as d}

        <div class="product">
            <div class="content">
                <div class="image">
                    <img src="{d.img}" alt="{d.product}" class="product-image">
                </div>
                <div class="text">
                    <h1>{d.product}</h1>
                    <p>£{d.price}</p>
                    <!-- <p>Expiration date: {d['expiry date']}</p> -->
                    <!-- <a href="products/{d.product}">Click here</a> -->
                </div>
            </div>
        </div>
        
            <!-- <li class="product">
                <a href={`${user == "admin"? "/admin":""}/products/${d.product}`}>
                        <img src="{d.img}" alt="cherry" width="200px"> 
                    <h1>{d.product}</h1>
                    <p>£{d.price}</p>
                    <p>Expiration date: {d['expiry date']}</p>
                </a>
                {#if user == "admin"}
                    <a href={`/admin/products/${d.product}`}>Click to edit component</a>
                {/if}
            </li> -->
            
            
        {/each}
    </div>
        
    {:catch error}
        <p>Error: {error.message}</p>
{/await}

</div>

