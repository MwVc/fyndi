import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const increase = () => setCount((prevCount) => prevCount + 1);

  return (
    <div>
      Count: {count}
      <button className="button" onClick={increase}>
        Add
      </button>
    </div>
  );
}

export default App;
