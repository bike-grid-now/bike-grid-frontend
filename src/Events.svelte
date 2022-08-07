<script>
    export let id;

    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import axios from 'axios';
    import { API_URL } from './stores.js';
    import Nav from './Nav.svelte';
    import Time from "svelte-time";
import Slides from './Slides.svelte';

    let url;

    API_URL.subscribe((val) => url = val);

    let event, media;

    // let urls = [];


    onMount(() => {
        axios.get(url + '/api/events/' + id + '?populate=*')
            .then(response => {
                event = response.data.data.attributes;
                console.log(event)

                // event.Media.data.forEach(m => {
                //     urls.push(url + m.attributes.url)
                // });

                media = event.Media;

            })
            .catch(error => {
                console.log('fetch error', error)

                // navigate to home
                navigate('/');
            });
    })
</script>

<Nav />

<div class="container">
    {#if event}
        <div class="sideby">
            <div class="card">
                <h1>{event.EventName}</h1>
                <p><Time timestamp={event.Date} format="dddd, MMMM D @ h:mm A"/></p>
            </div>
        
            <Slides media={[event.Poster.data]}/>
        </div>
    
        <Slides media={event.Media.data}/>
    
    {/if}
</div>

<div class="footer"></div>

<style>
    .container {
        width: 100%;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        grid-gap: 20px;
        margin-top: 20px;
    }

    .sideby {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

    .card {
        background-color: #1b1a1b;
        padding: 25px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        grid-gap: 15px;
    }

    .footer {
        height: 20px;
    }
</style>