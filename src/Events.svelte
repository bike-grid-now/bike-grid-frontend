<script>
    export let id;

    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";

    import Nav from './Nav.svelte';
    import Time from "svelte-time";
    import Slides from './Slides.svelte';

    let event, media;

    import { EVENTS } from './stores.js';

    let events;
    EVENTS.subscribe(val => {
        if (val) {
            events = val;
            getEvent();
        }
    });

    onMount(() => {
        getEvent();
    })

    function getEvent() {
        if (id && events) {
            events.forEach(e => {
                if (e.id === id) {
                    event = e;
                }
            });
        }
    }

    function toDateTime(seconds) {
        let t = new Date(1970, 0, 1);
        t.setSeconds(seconds - 18000);
        return t.toISOString();
    }
</script>

<Nav />

<div class="container">
    {#if event}
        <div class="sideby">
            <div class="card">
                <h1>{event.eventName}</h1>
                <p><Time timestamp={toDateTime(event.date.seconds)} format="dddd, MMMM D @ h:mm A"/></p>
            </div>
        
            <Slides media={[event.poster]}/>
        </div>
    
        {#if event.media}
            <div class="slide-container">
                <Slides media={event.media}/>
            </div>
        {/if}
    
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
        padding: 0px 15px;
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

    .slide-container {
        padding: 0px 15px;
    }

    @media only screen and (max-width: 600px) {
        .sideby {
            grid-template-columns: 1fr;
        }
    }
</style>