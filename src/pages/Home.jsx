import { useEffect, useState } from 'react';
import '../css/Home.scss';

const Home = () => {
    const [cats, setCats] = useState([]);
    const [availableCats, setAvailableCats] = useState([]);
    const [seeAllCats, setSeeAllCats] = useState(true);

    const loadCats = async () => {
        const response = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: '{getCats { name, image, message, available }}',
            }),
        });
        const responseBody = await response.json();
        setCats(responseBody.data.getCats);
        return responseBody.data.getCats;
    };

    const loadAvailableCats = async () => {
        const response = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: '{getAvailableCats { name, image, message, available }}',
            }),
        });
        const responseBody = await response.json();
        setAvailableCats(responseBody.data.getAvailableCats);
        return responseBody.data.getAvailableCats;
    };

    const handleFilter = () => {
        setSeeAllCats(!seeAllCats);
    };

    const catList = cats.map(cat => {
        return (
            <div key={cat.id}>
                <h1>{cat.name}</h1>
                {cat.available &&
                    <div class="entry">
                        <span class="available">Available</span>
                        <img src={`data:image/jpeg;base64,${cat.image}`} alt=""></img>
                    </div>
                }
                {!cat.available && 
                    <div class="entry">
                        <span class="adopted">Adopted</span>
                        <img src={`data:image/jpeg;base64,${cat.image}`} alt=""></img>
                    </div>
                }
                <div class="message">{cat.message}</div>
            </div>
        );
    });

    const availableCatList = availableCats.map(cat => {
        return (
            <div key={cat.id}>
                <h1>{cat.name}</h1>
                <div class="entry">
                    <span class="available">Available</span>
                    <img src={`data:image/jpeg;base64,${cat.image}`} alt=""></img>
                </div>
                <div class="message">{cat.message}</div>
            </div>
        );
    });

    useEffect(() => {
        loadCats();
        loadAvailableCats();
    }, []);
    
    return (
        <>
            <button onClick={handleFilter}>{seeAllCats ? 'Show available cats' : 'Show all cats'}</button>
            <div class="wrapper">{seeAllCats && catList}</div>
            <div class="wrapper">{!seeAllCats && availableCatList}</div>
        </>
    );
};

export default Home;
