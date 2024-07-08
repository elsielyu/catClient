import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Checkout.scss';

const Checkout = (props) => {
    const location = useLocation();
    const { state } = location;
    const { cat } = state;
    const { id, name, image } = cat;

    const [adopterName, setAdopterName] = useState('');
    const [adopterEmail, setAdopterEmail] = useState('');
    const [adopterMessage, setAdopterMessage] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false);

    useEffect(() => {
        if (adopterName && adopterEmail && adopterMessage) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }
    }, [adopterName, adopterEmail, adopterMessage]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: `mutation {sendEmail(id: "${id}", fromName: "${adopterName}, "fromEmail: "${adopterEmail}", message: "${adopterMessage}")}`,
            }),
        });
        const responseBody = await response.json();
        const success = responseBody.data.sendEmail;
        if (success) {
            setSubmitMessage('Your message was successfully sent to the owner.  Check your email for a response on next steps.');
        } else {
            setSubmitMessage('There was an issue sending your message to the owner.  Please try again later.');
        }
    }
    return (
        <div className="checkout">
            <h1>Yes, I want to adopt {name}!</h1>
            <div className="image">
                <img src={`data:image/jpeg;base64,${image}`} alt=""></img>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="line-item">
                    <label>Your name</label>  
                    <input
                        type="text"
                        value={adopterName}
                        onChange={(e) => setAdopterName(e.target.value)}
                    />
                </div>
                <div className="line-item">
                    <label>Your email address</label>
                    <input
                        type="text"
                        value={adopterEmail}
                        onChange={(e) => setAdopterEmail(e.target.value)}
                    />
                </div>
                <div className="line-item">
                    <label>Please tell the owner a little about yourself</label>
                    <textarea
                        value={adopterMessage}
                        onChange={(e) => setAdopterMessage(e.target.value)}
                    />
                </div>
                <input
                    className="submit"
                    type="submit"
                    disabled={!enableSubmit}
                />
            </form>
            {submitMessage &&
                <div className="submit-message">{submitMessage}</div>
            }
        </div>
    )
};

export default Checkout;