import { useState, Profiler, memo } from "react";

/*
    PROFILER

  Profiler is a React built in component that tracks its children and calls a callback function on every rerender with additional details passed to it
  This tool may help to find the critical components that takes too much time to render.

  It takes two props:
  - callback to call it on every render
  - id to be sure which Profiler calls the callback
*/

export const Profilers = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  /*
    This is the callback function for Profiler. All arguments it takes are described below.
  */
  const handleRender = (...params) => {
    const args = [
      "id", // the "id" prop of the Profiler tree that has just committed
      "phase", // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
      "actualDuration", // time spent rendering the committed update
      "baseDuration", // estimated time to render the entire subtree without memoization
      "startTime", // when React began rendering this update
      "commitTime", // when React committed this update
      "interactions", // the Set of interactions belonging to this update
    ];

    /*
      All data is logged to the console.
    */
    console.log(
      params.reduce(
        (obj, param, index) => ({
          ...obj,
          [args[index]]: param,
        }),
        {}
      )
    );
  };


  /*
    You can use many Profilers parallelly or nested.

    When you click on the button, the component state is updated and rerender is caused.
    Notice, how different data comes from callback of RandomText component and its memoized version 🙂
  */
  return (
    <div>
      <Profiler id="profiler" onRender={handleRender}>
        <button onClick={handleClick}>Click me 👇</button>
        <Profiler id="counter" onRender={handleRender}>
          <Counter count={count} />
        </Profiler>
        <Profiler id="static-text" onRender={handleRender}>
          <RandomText />
        </Profiler>
        <Profiler id="static-memoized-text" onRender={handleRender}>
          <RandomMemoizedText />
        </Profiler>
      </Profiler>
    </div>
  );
};

const Counter = ({ count }) => {
  return <p>Times clicked: {count}</p>;
};

const RandomText = () => {
  return <p>I'm just a static random text. Don't mind me 🙃</p>;
};

const RandomMemoizedText = memo(RandomText);
