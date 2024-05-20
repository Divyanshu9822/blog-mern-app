import React, { useState, useEffect } from 'react';

// Bad practice: Inline styles should be avoided in favor of CSS classes
const inlineStyle = {
  color: 'blue',
  fontSize: '20px',
};

const Test = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Bad practice: Use of any type in TypeScript or lack of proper typing
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // Bad practice: Missing dependency array will cause useEffect to run on every render
  useEffect(() => {
    fetchData();
  });

  // Bad practice: Using index as key in map function, can lead to issues with component re-rendering
  const renderList = () => {
    return [1, 2, 3, 4].map((item, index) => (
      <div key={index} style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>
        Item {item}
      </div>
    ));
  };

  return (
    <div>
      <h1 style={inlineStyle}>Test Page</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
      <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading data...'}</div>
      <div>{renderList()}</div>
    </div>
  );
};

export default Test;
