import { Suspense, lazy } from "react";
/*
    CONCURRENT MODE

  Concurrent mode is a feture that enables react to render components with a possibility to interrupt it.
  By default component rendering can't be interrupted, for example when data to be rendered changed during that time.

    SUSPENSE / CODE SPLITTING

  Suspense is a react built-in component that enables react to "wait" for a data or code before it's rendered.
  While waiting, it renders fallback component, that may indicate, something is still being processed.
  In case of lazy loading (code splitting) this can unblock your application for the time of loading heavy component.
*/

/*
  This is how the component is lazy laded. Notice, that it works only for default exported components ❗
  The component below is very lightweight, but you can try to throttle the CPU (On Performance tab in Chrome dev tools) and try to refresh the page.
  Fallback component should be rendered for a second.
*/
const LazyLoadedComponent = lazy(() => import("./LazyLoadedComponent"));

export const ConcurrentMode = () => {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <LazyLoadedComponent />
    </Suspense>
  );
};

const FallbackComponent = () => {
  return <div>I'm a fallback. Imagine I'm a spinner 💫 or something</div>;
};
