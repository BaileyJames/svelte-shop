<script>
    let largestId = "hi";
    const fetchData = fetch("http://localhost:4000/api/db").then((response) => response.json()).then((data) => {
        //Gets the largest id in the database, and adds one to it. This is so the database
        //automatically has an inputted unique id
        console.log(data[0]._id)
        largestId = data[0]._id + 1
    }).catch((err) => {console.log("There was an error: ", err)});
</script>
<div class="product-wrapper">
    <div class="product">
        <form method="POST" action="http://localhost:4000/api/db">


            <input type="text" id="product" name="product" placeholder="Product name">
            <br>
            <input type="text" id="price" name="price" placeholder="price">
            <br>
            <input type="date" id="expiration date" name="expiration date" placeholder="Expiry date">
            <br>
            {#await fetchData}
                fetching...
            {:then} 
            <input type="number" id="id" name="_id" placeholder="ID" value="{largestId}" readonly>

            {/await}
            <input type="submit" value="Submit">
            
        </form>
    </div>
  </div>