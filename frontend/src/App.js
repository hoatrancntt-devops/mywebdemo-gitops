import React, { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/hello').then(res => res.json()).then(data => setData(data));
  }, []);
  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>Frontend React App</h1>
      {data ? <p style={{color: 'green'}}>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}
export default App;
