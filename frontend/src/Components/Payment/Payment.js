import React, { useState } from 'react';
import PaymentModal from './PaymentModal';

const Payment = () => {
    const [upiId, setUpiId] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    

    // Sample UPI options
    const upiOptions = [
        { id: '1', name: 'Google Pay' },
        { id: '2', name: 'PhonePe' },
        { id: '3', name: 'Paytm' },
        { id: '4', name: 'Bharat Interface for Money (BHIM)' },
    ];

    const handlePayment = async () => {
        setLoading(true);
        setMessage('');

        // Simulating payment process
        try {
            if (!upiId || !selectedOption) {
                throw new Error('Please select a UPI option and enter your UPI ID.');
            }
            
            // Simulate the payment delay
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
            
            setMessage(`Payment successful! UPI ID: ${upiId}, Payment Method: ${selectedOption}`);
        } catch (error) {
            setMessage(`Payment failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <PaymentModal />
            {/* <h2>UPI Payment Simulation</h2>
            <div>
                <label>Select UPI Option:</label>
                <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="">--Select UPI Option--</option>
                    {upiOptions.map((option) => (
                        <option key={option.id} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Enter UPI ID:</label>
                <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="example@upi"
                />
            </div>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {message && <p>{message}</p>} */}
        </div>
    );
};

export default Payment;
