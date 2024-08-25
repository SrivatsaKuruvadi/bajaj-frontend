import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bajaj-backend-0mus.onrender.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonInput
      });

      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const filteredResponse = response ? Object.keys(response).reduce((acc, key) => {
    if (selectedOptions.includes(key)) {
      acc[key] = response[key];
    }
    return acc;
  }, {}) : {};

  return (
    <div>
      <h1>21BCE9062 - KURUVADI SRIVATSA</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={jsonInput} onChange={handleInputChange} placeholder="Enter JSON" />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <>
          <select multiple={true} onChange={handleOptionChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
