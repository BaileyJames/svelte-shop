<script>
    import { page } from '$app/stores';

    import { getContext, onMount } from 'svelte'

    const {slug} = $page.params
    console.log(slug)
    const apiUrl = "http://localhost:4000/api/db"
    let data = []

    let myParam = $page.params.product
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
            <form method="POST" action="http://localhost:4000/api/db/update">
                <h1>{d.product}</h1>
                <p>£{d.price}</p>
                <p>Expiration date: {d['expiry date']}</p>
                <img src="{d.images}" alt="the thing"/>
                <label for="product">Product name</label>
                <br>
                <input type="text" id="product" name="product" value="{d.product}">
                <br>
                <input type="text" id="price" name="price" value="{d.price}">
                <br>
                <input type="date" id="expiration date" name="expiration date" value="{d['expiry date']}">
                <br>
                id:
                <input type="number" id="expiration date" name="_id" value="{d._id}" readonly>

                <input type="submit" value="Submit">

            </form>
        </div>
    </div>
          
          
      {/each}
  {:catch error}
      <p>Error: {error.message}</p>
{/await}
