import { useState } from 'react';

const Home = () => {
    const [testMessage, setTestMessage] = useState('');
    const [catName, setCatName] = useState('');
    const [catImage, setCatImage] = useState('');
    const [catMessage, setCatMessage] = useState('');
  
    const loadTest = async () => {
      const response = await fetch('http://localhost:9000/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: '{test}',
        }),
      });
      const responseBody = await response.json();
      setTestMessage(responseBody.data.test);
      return responseBody.data.test;
    }

    const loadCat = async () => {
        const response = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            query: '{getCat { name, image, message }}',
            }),
        });
        const responseBody = await response.json();
        setCatName(responseBody.data.getCat.name);
        setCatImage(responseBody.data.getCat.image);
        setCatMessage(responseBody.data.getCat.message);
        return responseBody.data.getCat.message;
    };
    
    return (
        <>
            <button onClick={loadTest}>click me</button>
            <div>{testMessage}</div>
            <button onClick={loadCat}>click me for cat</button>
            <div>{catName}</div>
            <img src={`data:image/jpeg;base64,${catImage}`} alt=""></img>
            <div>{catMessage}</div>
        </>
    );
}

export default Home;