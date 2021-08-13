<div class="wrapper">
    <h1>Cool shop</h1>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</div>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    .wrapper {
        position: relative;
        display: grid;
        width: 90%;
        grid-template-columns: 25vw auto;
        margin: auto;
    }
    .wrapper ul {
        position: absolute;
        right: 2em;
        height: 100%;
    }
    .wrapper ul li {
        position: relative;
        list-style-type: none;
        display: inline-block;
        top: 1em;
    }
    .wrapper ul li a {
        text-decoration: none;
        display: block;
        padding: 0 2em;

    }
</style>
<slot></slot>