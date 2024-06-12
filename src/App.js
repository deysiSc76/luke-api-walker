import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  const [resource, setResource] = useState('people');
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const handleResourceChange = (e) => {
    setResource(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/${resource}/${id}/`);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const result = await response.json();
      setData(result);
      setError(false);
    } catch (err) {
      setError(true);
      setData(null);
    }
  };

  return (
    <div>
      <h1>SWAPI Explorer</h1>
      <select value={resource} onChange={handleResourceChange}>
        <option value="people">People</option>
        <option value="planets">Planets</option>
        <option value="starships">Starships</option>
      </select>
      <input type="number" value={id} onChange={handleIdChange} />
      <button onClick={handleSubmit}>Search</button>
      {error ? (
        <div>
          <p>Estos no son los droides que está buscando</p>
          <img src="https://movienetworkpr.com/wp-content/uploads/2019/11/OBI-WAN-KENOBI-759x500.jpg" alt="Obi-Wan Kenobi" />
        </div>
      ) : data ? (
        <div>
          <h2>Result:</h2>
          <h2>Name: {data.name}</h2>
          <p>Height: {data.height}</p>
          <p>Mass: {data.mass}</p>
          <p>Hair color: {data.hair_color}</p>
        </div>
      ) : null}
    </div>
  );
};

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const result = await response.json();
        setData(result);
        setError(false);
      } catch (err) {
        setError(true);
        setData(null);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {error ? (
        <div>
          <p>Estos no son los droides que está buscando</p>
          <img src="https://movienetworkpr.com/wp-content/uploads/2019/11/OBI-WAN-KENOBI-759x500.jpg" alt="Obi-Wan Kenobi" />
        </div>
      ) : data ? (
        <div>
          <h2>Name: {data.name}</h2>
          <p>Name: {data.name}</p>
          <p>Height: {data.height}</p>
          <p>Mass: {data.mass}</p>
          <p>Hair color: {data.hair_color}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
