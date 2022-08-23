<script>
  import Time from "svelte-time";
  import { navigate } from "svelte-routing";

  export let events = [];
  export let previous = false;

  let title = previous ? "Previous Events" : "Upcoming Events";

  let sortedEvents = events.sort((a, b) =>
    previous ? a.date > b.date : a.date < b.date
  );

  function gotoEvent(id) {
    navigate("/events/" + id);
  }

  function toDateTime(seconds) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(seconds - 18000);
    return t.toISOString();
  }
</script>

{#if sortedEvents.length > 0}
  <main>
    <div class="top">
      <span class="material-symbols-outlined"> calendar_month </span>
      <h2>{title}</h2>
    </div>

    <div class="divider" />

    <div class="grid">
      {#each sortedEvents as event}
        <div class="row" on:click={() => gotoEvent(event.id)}>
          <div class="p-outer left">
            <p>{event.eventName}</p>
          </div>
          <div class="p-outer">
            <p>
              <Time
                timestamp={toDateTime(event.date.seconds)}
                format={"dddd, MMMM D" + (!previous ? "H:mm A" : "")}
              />
            </p>
          </div>
          <div class="p-outer right">
            <p>
              <span class="material-symbols-outlined arrow">chevron_right</span>
            </p>
          </div>
        </div>
      {/each}
    </div>
  </main>
{/if}

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
