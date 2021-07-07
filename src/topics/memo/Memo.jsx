import { useState, useRef, memo } from "react";

/*
    MEMO

  React memo is a HOC used to memoize components by its props.
  When a component is rerendered, all of its children are also rerendered, no matter if their props changed.
  Memoized version of those children will not rerender them until their props are changed. That makes a difference when children render a lot of data.
*/

export const Memo = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me 👇</button>
      <p>Times clicked: {count}</p>

      {/*
        We render <RenderCounter> component as a child, either without and with memoization.

        You can spot that component without memoization is rerendered 2 times.
        Don't worry, it's caused by the React strict mode. On prod it will rerender only one time per change 😛
      */}
      <div>
        Times rendered (without memoization): <RenderCounter />
      </div>
      <div>
        Times rendered (with memoization): <MemoizedRenderCounter />
      </div>
    </div>
  );
};

const RenderCounter = () => {
  /*
    useRef is used here to keep render counter value on rerenders.
  */
  const renderCounter = useRef(0);

  renderCounter.current++;

  return <span> {renderCounter.current}</span>;
};

const MemoizedRenderCounter = memo(RenderCounter);

/*
By deafult, memo compares complex props shallowly, but you can pass a custom function as a second parameter to do more advanced comparison.
*/

// const arePropsEqual = (prevProps, nextProps) => {
//   return prevProps == nextProps;
// }

// const MemoizedRenderCounter = memo(RenderCounter, arePropsEqual);
