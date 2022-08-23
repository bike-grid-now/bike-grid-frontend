<script>
  import paintCroppedUrl from "./static/paint-cropped.png";

  export let absolute = false;
</script>

<div class="nav-outer" style="position: {absolute ? 'absolute' : ''};">
  <div class="content">
    <div class="nav">
      <div class="top">
        <a href="/">
          <div class="left">
            <span class="material-symbols-outlined">pedal_bike</span>
            <p><b>Chicago, Bike Grid Now!</b></p>
          </div>
        </a>
        <!-- <span class="material-symbols-outlined">menu</span> -->
      </div>
      {#if !absolute}
        <a href="/">
          <div class="bottom">
            <img src={paintCroppedUrl} alt="" />
          </div>
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  .nav-outer {
    /* position: fixed; */
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    pointer-events: all;

    /* .content { */
    width: 100%;
    /* max-width: 1000px; */
    /* position: relative; */

    /* } */
  }

  a {
    text-decoration: none;
    color: white;
  }

  .nav {
    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;

    /* padding: 0px 20px;; */

    /* margin: 20px; */
    margin-top: 20px;
    /* background-color: white; */
    background-color: #1b1a1b;
    color: white;
    padding: 20px;
    border-radius: 15px;
    /* border: 1px solid rgb(201, 201, 201); */

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    transition: box-shadow 0.15s;
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottom {
    margin-top: 25px;

    width: 100%;
    /* height: 200px; */
  }

  .bottom img {
    width: 100%;
    /* height: 100%; */
    object-fit: contain;
    border-radius: 10px;
  }

  .left {
    display: flex;
    align-items: center;
    /* cursor: pointer; */
  }

  .left span {
    margin-right: 10px;
  }

  .content {
    margin: 0px 15px;
  }
</style>
