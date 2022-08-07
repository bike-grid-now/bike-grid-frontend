<script>
	import Home from "./Home.svelte";
	import { Router, Route } from "svelte-routing";
	import Events from "./Events.svelte";
	import About from "./About.svelte";
</script>

<Router>
	<Route path="/"><Home/></Route>
	<Route path="/about"><About/></Route>
	<Route path="/events/:id" let:params><Events id={params.id}/></Route>
</Router>

