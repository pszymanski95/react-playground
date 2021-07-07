import ReactDOM from "react-dom";

/*
    PORTALS

  Portals are used to render react component into DOM node outside of the root hierarchy, that is DOM node where the React is rendered into.

  In general it enables to display elements which couldn't be visible inside root tree,
  for example when some of the ancestor element has CSS property 'visibility: hidden', 'display: none' or z-index set.

  What's important, is that event bubbling works like it's the child of the parent component.
*/

export const Portals = () => {

  /*
    Event handler is defined in the parent element. Event created by the button should be bubbled way up here.
  */
  const handleClick = (e) => {
    console.log('Event initiator:', e.target);
  };

  return (
    <div onClick={handleClick}>
      <MyPortal />
    </div>
  )

};

const MyPortal = () => {
    /*
    You can find <div> element with .my-portal id in public/index.html file as a sibling to the .root element 🔍
  */
    const node = document.getElementById('my-portal');

    /*
      This is the component to render into DOM node outside react hierarchy
    */
    const portalContent = (
      <div>
        <p>Hello from outside the react DOM hierachy 👋</p>
        <button>Click me 👇 and check the console</button>
      </div>
    );
  
    return ReactDOM.createPortal(portalContent, node);
}