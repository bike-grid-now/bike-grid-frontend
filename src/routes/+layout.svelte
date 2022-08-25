<script>
  import "../styles/global.css";
  import Nav from "../Nav.svelte";
  import Seo from "../Seo.svelte";
  import VercelBanner from "../VercelBanner.svelte";
</script>

<Nav />
<Seo />

<slot />

<VercelBanner />
