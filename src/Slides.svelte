<script>
    import { onMount } from 'svelte';

    export let media;

    let imageTypes = [".JPEG", ".JPG", ".PNG", ".GIF", ".SVG", ".TIFF", ".ICO", ".DVU"]
    let videoTypes = [".MPEG", ".MP4", ".QUICKTIME", ".WMV", ".AVI", ".FLV"]

    import { API_URL } from './stores.js';

    let url;
    API_URL.subscribe((val) => url = val);

    let currentMediaIndex = 0;

    function left() {
        if (currentMediaIndex > 0) {
            currentMediaIndex--;
        } else {
            currentMediaIndex = media.length - 1;
        }
    }

    function right() {
        if (currentMediaIndex < media.length - 1) {
            currentMediaIndex++;
        } else {
            currentMediaIndex = 0;
        }
    }

    onMount(() => {
        if (media) {
            console.log(media)
        }
    })
</script>

<div class="card">
    <div class="background">
        {#if imageTypes.includes(media[currentMediaIndex]?.attributes?.ext?.toUpperCase())}
            <img src={url + media[currentMediaIndex].attributes.url} alt="">
        {/if}
        
        {#if videoTypes.includes(media[currentMediaIndex]?.attributes?.ext?.toUpperCase())}
            <video muted>
                <source src={url + media[currentMediaIndex]?.attributes?.url} type="video/mp4">
                <track kind="captions">
            </video>
        {/if}
    </div>

    <div class="foreground">
        {#if imageTypes.includes(media[currentMediaIndex]?.attributes?.ext?.toUpperCase())}
            <img src={url + media[currentMediaIndex].attributes.url} alt="">
        {/if}
        
        {#if videoTypes.includes(media[currentMediaIndex]?.attributes?.ext?.toUpperCase())}
            <video controls>
                <source src={url + media[currentMediaIndex]?.attributes?.url} type="video/mp4">
                <track kind="captions">
            </video>
        {/if}
    </div>

    {#if media.length > 1}
        <div class="ui">
            <span class="material-symbols-outlined" on:click={left}>arrow_circle_left</span>
            <span class="material-symbols-outlined" on:click={right}>arrow_circle_right</span>
        </div>
    {/if}
</div>

<style>
    .card {
        background-color: #1b1a1b;
        height: 600px;
        border-radius: 15px;
        overflow: hidden;
        position: relative;
    }

    .background, .foreground, .ui, .overlay, .ui-bottom {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .background img, .background video {
        width: 100%;
        height: 100%;
        position: relative;
        object-fit: cover;
        filter: blur(5px) brightness(0.5);
        pointer-events: none;
    }

    .foreground img, .foreground video {
        width: 100%;
        height: 100%;
        position: relative;
        object-fit: contain;
    }

    .ui {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10px;
        pointer-events: none;
    }

    .ui span {
        font-size: 2.5rem;
        cursor: pointer;

        pointer-events: all;

        user-select: none;

        font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
    }
</style>