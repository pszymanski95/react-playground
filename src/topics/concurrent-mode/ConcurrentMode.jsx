import { Suspense, lazy, Component } from "react";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
/*
    CONCURRENT MODE

  Concurrent mode is a feture that enables react to render components with a possibility to interrupt it.
  By default component rendering can't be interrupted, for example when data to be rendered changed during that time.

    SUSPENSE / CODE SPLITTING

  Suspense is a react built-in component that enables react to "wait" for a data or code before it's rendered.
  While waiting, it renders fallback component, that may indicate, something is still being processed.
  In case of lazy loading (code splitting) this can unblock your application for the time of loading heavy component.

  Suspense can be utilized with fetching library (for example Relay or react-query).
  
  Suspense doesn't use Promises, it has it's own logic.
*/

/*
  This is how the component is lazy laded. Notice, that it works only for default exported components ❗

  The component below is very lightweight, but you can try to throttle the CPU (on Performance tab in Chrome dev tools) and try to refresh the page.
  Fallback component should be rendered for a second.
*/
const LazyLoadedComponent = lazy(() => import("./LazyLoadedComponent"));

/*
  This is the fallback component that is rendered when LazyLoadedComponent is not ready to render.
*/
const FallbackComponent = () => {
  return <div>I'm a fallback. Imagine I'm a spinner 💫 or something</div>;
};

export const ConcurrentMode = () => {
  return (
    <div>
      {/* 
        This code renders the lazy loaded component.
      */}
      <div style={{ border: "solid 1px #024", maxWidth: "500px" }}>
        <Suspense fallback={<FallbackComponent />}>
          <LazyLoadedComponent />
        </Suspense>
      </div>
      <QueryClientProvider client={queryClient}>
        <div style={{ border: "solid 1px #024", maxWidth: "500px" }}>
          {/* 
          This code renders random Pokemon
        */}
          <p>Random Pokemon</p>
          <Suspense fallback={<FallbackPokemon />}>
            <RandomPokemon />
          </Suspense>
        </div>
        <div style={{ border: "solid 1px #024", maxWidth: "500px" }}>
          {/* 
            This code renders non existent Pokemon
          */}
          <p>Not existing Pokemon (this will throw an error in a moment)</p>
          <Suspense fallback={<FallbackPokemon />}>
            <ErrorBoundary fallback={<FallbackPokemonError />}>
              <VeryRarePokemon />
            </ErrorBoundary>
          </Suspense>
        </div>
      </QueryClientProvider>
    </div>
  );
};

/*
  This component fetches Pokemons from public API. It uses react-query library which utilizes suspense feature.
  We request for the list of all Pokemons to exend the time, API needs to return the data.

  Because the data is not heavy and API is quite fast, you can try to throttle the CPU and network (On Performance tab in Chrome dev tools) and try to refresh the page.
  Fallback text should be displayed for a moment, while data is still being fetched.
*/
const randomPokemonNo = Math.floor(Math.random() * (1118 - 1) + 1);

const queryClient = new QueryClient();

const RandomPokemon = () => {
  const { data } = useQuery(
    "pokemon",
    () =>
      fetch("https://pokeapi.co/api/v2/pokemon?limit=10000").then((res) =>
        res.json()
      ),
    { suspense: true }  // This enabled Suspense in react-query library
  );

  return (
    <div>
      <p>Your random Pokemon: {data.results[randomPokemonNo].name}</p>
    </div>
  );
};

/*
  This is the fallback component that is rendered when Pokemons are still fetching.
*/
const FallbackPokemon = () => {
  return <div>Trying to catch a pokemon 😣</div>;
};

/*
  This component fetches non existent Pokemon from public API. Pokemon with id 'totalyNotWrongPokemonId' doesn't exist, so API will return 404 code.
  React-query by default tries 4 times to fetch the data. After that it will throw an error, which must be catched by the error boundary created below.
  This can't be done with commonly used catch() approach, because Suspense doesn't use Promises.
*/
const VeryRarePokemon = () => {
  const { data } = useQuery(
    "nonexistent-pokemon",
    () =>
      fetch("https://pokeapi.co/api/v2/pokemon/totalyNotWrongPokemonId").then(
        (res) => res.json()
      ),
    { suspense: true }  // This enabled Suspense in react-query library
  );

  return (
    <div>
      <p>Your very rare Pokemon: {data.results[randomPokemonNo].name}</p>
    </div>
  );
};

/*
  This is common Error Boundary component to catch react errors and prevents react from blocking itself.
*/
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    const { children, fallback } = this.props;
    if (this.state.hasError) {
      return fallback;
    }
    return children;
  }
}

/*
  Fallback for the error
*/
const FallbackPokemonError = () => {
  return <div>❗ Oh nooo! We couldn't catch any Pokemon! 😢 ❗</div>;
};
