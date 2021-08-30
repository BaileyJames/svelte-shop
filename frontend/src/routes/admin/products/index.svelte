<script>
    import ProductTemplate from "../../products/index.svelte"
    import Edit from "./edit.svelte"
</script>
<h1>Hei</h1>
<ProductTemplate user={"admin"}>
    <Edit></Edit>
    <h1>HEl;</h1>
</ProductTemplate>
<Edit></Edit>
<style>
    h1{
        background-color: blue;
    }
</style>