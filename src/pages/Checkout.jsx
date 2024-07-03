import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Checkout.scss';

const Checkout = (props) => {
    const location = useLocation();
    const { state } = location;
    const { cat } = state;
    const { name, image, owner } = cat;

    const [adopterName, setAdopterName] = useState('');
    const [adopterEmail, setAdopterEmail] = useState('');
    const [adopterMessage, setAdopterMessage] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let success = true;
        if (success) {
            setSubmitMessage('Your message was successfully sent to the owner.  Check your email for a response on next steps.');
        } else {
            setSubmitMessage('There was an issue sending your message to the owner.  Please try again later.');
        }
    }
    return (
        <div className="checkout">
            <h1>Yes, I want to adopt {name}!</h1>
            <div>
                <img src={`data:image/jpeg;base64,${image}`} alt=""></img>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Your name</label>  
                <input
                    type="text"
                    value={adopterName}
                    onChange={(e) => setAdopterName(e.target.value)}
                />
                <label>Your email address</label>
                <input
                    type="text"
                    value={adopterEmail}
                    onChange={(e) => setAdopterEmail(e.target.value)}
                />
                <label className="long-label">Please tell the owner a little about yourself</label>
                <textarea
                    value={adopterMessage}
                    onChange={(e) => setAdopterMessage(e.target.value)}
                />
                <input
                    className="submit"
                    type="submit"
                    disabled={submitMessage}
                />
            </form>
            {submitMessage &&
                <span>{submitMessage}</span>
            }
        </div>
    )
};

export default Checkout;