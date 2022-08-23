<script>
    import Nav from "./Nav.svelte";
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { ORGANIZERS } from "./stores";

    let organizers = [];
    ORGANIZERS.subscribe((val) => organizers = val);
</script>

<Nav/>

<div class="content">

    <div class="grid">
        {#each organizers as o}
            <div class="card">
                {#if o.attributes?.Image?.data?.attributes?.url}
                    <img src={url + o.attributes.Image.data.attributes.url} alt="">
                {/if}
                <h2>{o.attributes.Name}</h2>
                <p>{o.attributes.Description}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .grid {
        display: grid;
        /* margin: 50px 20px; */
        grid-gap: 20px;
        grid-template-columns: 1fr 1fr;
    }

    .card {
        background-color: #1b1a1b;
        padding: 50px;
        border-radius: 15px;

        display: flex;
        flex-direction: column;
        grid-gap: 30px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    .content {
        width: 100%;
        max-width: 1000px;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        /* padding: 0px 20px;; */

        margin-top: 20px;
    }

    img {
        height: 200px;
        width: 200px;
        border-radius: 50%;
        object-fit: cover;
    }

    p {
        line-height: 200%;
    }
</style>