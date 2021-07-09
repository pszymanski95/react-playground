import { useState, useRef, memo, useCallback, useMemo } from "react";

/*
    USEMEMO AND USECALLBACK

  UseMemo and useCallback are very similar tolls to each other. Both takes two arguments: function and array of dependencies.
  The difference of these two functions are that:
  - useMemo returns memoized result of the function. It's memoized values depends on the values in dependency array.
  - useCallback returns memoized function. Memoized function also depends on the values in dependency array.

  UseMemo is mostly used to memoize results of functions that require a lot of computing work.
  It basicly returns memoized (saved) value of that function in case value for particular dependency has been already computed.

  UseCallback is mostly used along with the React.memo. It ensure, that memoized function didn't change due to parent rerendering.
*/

export const UseMemoUseCallback = () => {
  const [count, setCount] = useState(10);
  const [count2, setCount2] = useState(100);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleIncrement2 = () => {
    setCount2(count2 + 1);
  };

  /*
    GetCount renders the first counter. It's not memoized, therefore this function will be reacreated each time this component is rerendered (every state change).
    Because of that, the child component that takes this function as a prop will also be rerendered, because React.memo sees that props change.
  */
  const getCount = () => <p>Times clicked: {count}</p>;

  /*
    GetCount2 renders the second counter. It's memoized as memoizedGetCount2. This memoized function depends on count2 state,
    and therefore this function is recreated only when parent component rerenders AND count2 state changes.
    Because of that, child component that takes this function as a prop should also rerenders only, when count2 state changes.
  */
  const getCount2 = () => <p>Times clicked: {count2}</p>;
  const memoizedGetCount2 = useCallback(getCount2, [count2]);


  /*
    Lets suppose that this euclidean algorith requires a lot of computation to generate result.
    
    Without memoization, this function would need to compute every time count or count2 changes. This situation could drastically slow down the application.
    With memoization, every time count or count2 changes, useMemo tries to return earlier computed value without caling the function
    (of course it's already computed result for the given parameters).

    You may notice, that useMemo also takes the heavyComputation function in the dependancy array.
    That's because useMemo (as well as useEfect) wants all the dependencies like varaibles and functions in its dependancy array.
    As heavyComputation function may be recreated on component rerender it must use useCallback, to make sure the reference stays the same.
    Otherwise memoized value would be always computed from scratch, because heavyComputation reference would change.
  */
  const heavyComputation = useCallback((a, b) => b === 0 ? a : heavyComputation(b, a % b), []);
  const memoizedValue = useMemo(() => heavyComputation(count, count2), [heavyComputation, count, count2]);

  return (
    <div>

      {/* 
        You should notice, that first counter is rerendered even, the second counter is incremented.
      */}
      <div style={{ border: "solid 1px #024", maxWidth: "360px" }}>
        <button onClick={handleIncrement}>Increment first counter ➕</button>
        <p>
          Times rendered (without memoized getCount):{" "}
          <MemoizedRenderCounter getCount={getCount} />
        </p>
      </div>

      {/* 
        Second counter is rerendered only when the second counter is incremented.
      */}
      <div style={{ border: "solid 1px #024", maxWidth: "360px" }}>
        <button onClick={handleIncrement2}>Increment second counter ➕</button>
        <p>
          Times rendered (with memoized getCount):{" "}
          <MemoizedRenderCounter getCount={memoizedGetCount2} />
        </p>
      </div>

      <div>
        Hard calculated value (gcd): {memoizedValue}
      </div>
    </div>
  );
};

const MemoizedRenderCounter = memo(({ getCount }) => {
  /*
    useRef is used here to keep render counter value on rerenders.
  */
  const renderCounter = useRef(0);

  renderCounter.current++;

  return (
    <span>
      {renderCounter.current}
      {/* 
        The counter from parent component is rendered here.
       */}
      {getCount()}
    </span>
  );
});
