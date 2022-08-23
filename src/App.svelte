<script>
	import Home from "./Home.svelte";
	import { Router, Route } from "svelte-routing";
	import Events from "./Events.svelte";
	import About from "./About.svelte";

	import { initializeApp } from 'firebase/app';
	import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

	import { EVENTS, ORGANIZERS } from './stores.js';

	const firebaseConfig = {
		apiKey: "AIzaSyDxbVRKzlIaOj-yyVSA_SRiHoMWtSjj8PI",
		authDomain: "bike-grid-now.firebaseapp.com",
		projectId: "bike-grid-now",
		storageBucket: "bike-grid-now.appspot.com",
		messagingSenderId: "87272368171",
		appId: "1:87272368171:web:07c10c4954cf7fa7ef226e",
		measurementId: "G-EDKYCVXXW8"
	};

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	getEvents()
	getOrganizers()

	async function getEvents() {
		const eventsRef = collection(db, 'events');
		const q = query(eventsRef, orderBy("date"))

		const querySnapshot = await getDocs(q);

		let events = [];
		querySnapshot.forEach(doc => events.push(doc.data()))

		EVENTS.set(events)

		console.log('events', events)
	}

	async function getOrganizers() {
		const organizersRef = collection(db, 'organizers');
		const q = query(organizersRef)

		const querySnapshot = await getDocs(q);

		let organizers = [];
		querySnapshot.forEach(doc => organizers.push(doc.data()))

		ORGANIZERS.set(organizers)

		console.log('organizers', organizers)
	}
</script>

<Router>
	<Route path="/"><Home/></Route>
	<Route path="/about"><About/></Route>
	<Route path="/events/:id" let:params><Events id={params.id}/></Route>
</Router>

