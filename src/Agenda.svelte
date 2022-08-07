<script>
    export let previous = false;

    import Time from "svelte-time";
    import axios from 'axios';
    import { API_URL } from './stores.js';
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    let url;
    API_URL.subscribe((val) => url = val);

    let events = [];

    onMount(() => {
        axios.get(url + '/api/events?populate=*').then(response => {
            // filter to upcoming events
            
            events = response.data.data.filter(e => {
                if (previous) {
                    return new Date(e.attributes.Date) < new Date();
                } else {
                    return new Date(e.attributes.Date) >= new Date();
                }
            }).sort((a, b) => {
                return new Date(a.attributes.Date) - new Date(b.attributes.Date);
            })
        }).catch(error => {
            console.log('fetch error', error)
        });
    });

    function gotoEvent(id) {
        navigate('/events/' + id);
    }
</script>

<main>
    <div class="top">
        <span class="material-symbols-outlined">
            calendar_month
            </span>
        <h2>{previous ? 'Previous' : 'Upcoming'} Events</h2>
    </div>

    <div class="divider"/>

    <div class="grid">
        {#if events}
            {#each events as event, i}
                <div class="row" on:click={() => gotoEvent(event.id)}>
                    <div class="p-outer left">
                        <p>{event.attributes.EventName}</p>
                    </div>
                    <div class="p-outer">
                        <p><Time timestamp={event.attributes.Date} format={"dddd, MMMM D" + (previous ? "" : " h:mm A")}/></p>
                    </div>
                    <div class="p-outer right">
                        <p><span class="material-symbols-outlined arrow">chevron_right</span></p>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</main>

<style>
    main {
        background-color: #1b1a1b;
        border-radius: 15px;
        padding: 20px;
        color: white;
		border-radius: 15px;
		border: 1px solid black;
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.15s;
    }

    .top {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 5px;
    }

    .top span {
        margin-right: 10px;
    }

    .grid {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-row-gap: 15px;
    }

    .row {
        display: contents;
        transition: 0.15s;
        border-radius: 10px;
        cursor: pointer;

        background-color: gray;
    }

    .row .p-outer {
        padding: 15px;
        transition: 0.15s;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .p-outer.right {
        align-items: flex-end;
    }

    .row p {
        height: fit-content;
    }

    .row .left {
        border-radius: 10px 0px 0px 10px;
    }

    .row .right {
        border-radius: 0px 10px 10px 0px;  
    }

    .row:hover .p-outer {
        background-color: #c70909;
    }

    .left {
        font-weight: bold;
    }

    .right {
        display: flex;
        align-items: center;
        grid-gap: 15px;
    }

    .divider {
        width: 100%;
        height: 1px;
        background-color: rgb(201, 201, 201);
        margin-bottom: 20px;
    }
</style>