import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.scss';

const Home = () => {
    const navigate = useNavigate();
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
                query: '{getCats { name, image, message, available, owner { firstName, lastName, email } }}',
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
                query: '{getAvailableCats { name, image, message, available, owner { firstName, lastName, email }}}',
            }),
        });
        const responseBody = await response.json();
        setAvailableCats(responseBody.data.getAvailableCats);
        return responseBody.data.getAvailableCats;
    };

    const handleFilter = () => {
        setSeeAllCats(!seeAllCats);
    };

    const handleAdopt = (cat) => {
        navigate('/checkout', { state: { cat: cat }});
    };

    const catList = cats.map(cat => {
        return (
            <div key={cat.id}>
                <h1>{cat.name}</h1>
                {cat.available &&
                    <div className="entry" onClick={() => handleAdopt(cat)}>
                        <span className="available">Available</span>
                        <img src={`data:image/jpeg;base64,${cat.image}`} alt=""></img>
                    </div>
                }
                {!cat.available && 
                    <div className="entry">
                        <span className="adopted">Adopted</span>
                        <img src={`data:image/jpeg;base64,${cat.image}`} alt=""></img>
                    </div>
                }
                <div className="message">{cat.message}</div>
            </div>
        );
    });

    const availableCatList = availableCats.map(cat => {
        return (
            <div key={cat.id}>
                <h1>{cat.name}</h1>
                <div className="entry" onClick={() => handleAdopt(cat.owner)}>
                    <span className="available">Available</span>
                    <img src={`data:image/jpeg;base64,${cat.image}`} alt=""></img>
                </div>
                <div className="message">{cat.message}</div>
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
            <div className="wrapper">{seeAllCats && catList}</div>
            <div className="wrapper">{!seeAllCats && availableCatList}</div>
        </>
    );
};

export default Home;