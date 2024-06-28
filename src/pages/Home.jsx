import { useEffect, useState } from 'react';
import '../css/Home.scss';

const Home = () => {
    const [catName, setCatName] = useState('');
    const [catImage, setCatImage] = useState('');
    const [catMessage, setCatMessage] = useState('');
    const [catAvailable, setCatAvailable] = useState(false);

    const loadCat = async () => {
        const response = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            query: '{getCat { name, image, message, available }}',
            }),
        });
        const responseBody = await response.json();
        setCatName(responseBody.data.getCat.name);
        setCatImage(responseBody.data.getCat.image);
        setCatMessage(responseBody.data.getCat.message);
        setCatAvailable(responseBody.data.getCat.available);
        return responseBody.data.getCat.message;
    };

    useEffect(() => {
        return loadCat();
    }, []);
    
    return (
        <>
            <h1>{catName}</h1>
            {catAvailable && 
                <div class="entry">
                    <span class="badge">Available</span>
                    <img src={`data:image/jpeg;base64,${catImage}`} alt=""></img>
                </div>
            }
            {!catAvailable && <img src={`data:image/jpeg;base64,${catImage}`} alt=""></img>}
            <div class="message">{catMessage}</div>
        </>
    );
};

export default Home;