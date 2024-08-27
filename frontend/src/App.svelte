<script>
  import { Router, Link, Route } from "svelte-routing";
  import About from "./routes/about.svelte";
  import Home from "./routes/home.svelte";
  import Signup from "./routes/signup.svelte";
  import Signin from "./routes/signin.svelte";
</script>

<Router>
  <div>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/signup" component={Signup} />
    <Route path="/signin" component={Signin} />
  </div>
</Router>
