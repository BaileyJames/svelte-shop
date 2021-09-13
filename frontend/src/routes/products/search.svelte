<script>
    import { page } from '$app/stores';

    console.log($page.query.get("product"))
    const query = $page.query.get("product")
    let myData = []
    console.log(query)
    const fetchData = fetch(`http://localhost:4000/api/db/search?product=${query}`).then((response) => response.json()).then((data) => {
        myData = data
        console.log(data)
        console.log(myData)

    }).catch((err) => {console.log("There was an error: ", err)});

</script>

{#await fetchData}
    <p>Loading results...</p>
    {:then}
        {#each myData as product}
        <div class="product">
            <p>{product.product}</p>
            <p>£{product.price}</p>
        </div>
        
        {/each}
    {:catch}
    <p>Error</p>
    
{/await}

<style>
    .product {
        background-color: grey;
    }
</style>