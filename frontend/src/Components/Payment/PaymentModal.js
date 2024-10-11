import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';

const PaymentModal = () => {
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const location = useLocation();
    const {addExpense} = useGlobalContext();

    const { cost } = location.state || {};
    const [cardDetails, setCardDetails] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const [inputState, setInputState] = useState({
        title: "Reimbursement ",
        amount: cost ,
        date: new Date(),
        category: "Reimbursement",
        description: "Reimbursement",
    })

    const { title, amount, date, category,description } = inputState;

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const processPayment = () => {
        // Show the loader
        setLoading(true);
        setTransactionId('');

        // Simulate payment processing with a timeout
        setTimeout(() => {
            // Hide the loader
            setLoading(false);
            
            // Generate a mock transaction ID
            const mockTransactionId = 'TXN' + Math.floor(Math.random() * 1000000);
            
            // Display the transaction ID
            setTransactionId(mockTransactionId);
        }, 2000); // Simulate 2 seconds for payment processing
        addExpense(inputState)
       
    };

    return (
        <div className="container mt-5 px-5">
            <div className="mb-4">
                <h2>Pay Now ! </h2>
                {/* <span>Please make the payment; after that, you can enjoy all the features and benefits.</span> */}
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card p-3">
                        <h6 className="text-uppercase">Payment details</h6>
                        <div className="inputbox mt-3">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={cardDetails.name}
                                onChange={handleInputChange}
                                required
                            />
                            <p> </p> 
                            <span>Name on card</span>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="inputbox mt-3 mr-2">
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        className="form-control"
                                        value={cardDetails.cardNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <p> </p>
                                    <i className="fa fa-credit-card">  </i>
                                    
                                    <span>  Card Number</span>
                                    
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div >
                                    <div className="inputbox mt-3 mr-4">
                                        <input

                                            type="text"
                                            name="expiry"
                                            className="form-control mr-4"
                                            value={cardDetails.expiry}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <p> </p>
                                       
                                        <span>Expiry   </span>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div >
                                    <div className="inputbox mt-3 mr-4">
                                    
                                        <input

                                            type="password"
                                            name="cvv"
                                            className="form-control mr-4"
                                            value={cardDetails.cvv}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <p> </p> 
                                       
                                        <span>CVV   </span>
                                    </div>
                                    
                                </div>
                            </div>
                           </div>
                    </div>

                    <div className="mt-4 mb-4 d-flex justify-content-between">
                      
                        <button className="btn btn-success px-3" onClick={processPayment} disabled={loading}>
                            {loading ? 'Processing...' : `Pay Rs. ${cost}  `}
                        </button>
                    </div>
                </div>

                {/* <div className="col-md-4">
                    <div className="card card-blue p-3 text-white mb-3">
                        <span>You have to pay</span>
                        <div className="d-flex flex-row align-items-end mb-3">
                            <h1 className="mb-0 yellow">Rs. 549</h1>
                            <span>.99</span>
                        </div>
                        {/* <span>Enjoy all the features and perks after you complete the payment</span>
                        <a href="#" className="yellow decoration">Know all the features</a>
                        <div className="highlight">
                            <span>100% Guaranteed support and updates for the next 5 years.</span> */}
                        {/* </div> */}
                    {/* </div>
                </div> */} 
            </div>

            {transactionId && (
                <div className="alert alert-success mt-4">
                    Payment Successful! Transaction ID: {transactionId}
                </div>
            )}
        </div>
    );
};

export default PaymentModal;


// import React from 'react'
// import swal from 'sweetalert';

// const PaymentModal = () => {

//   async function pay()
//   {
//     window.ethereum.request({ method: 'eth_requestAccounts' });
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
// const account = accounts[0];

// const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '1000000000000', // customizable by user during MetaMask confirmation.
//     gas: '100', // customizable by user during MetaMask confirmation.
//     to: '0xB75135791160E1f529aE54619927E14aB5d90656', // Required except during contract publications.
//     from: window.ethereum.selectedAddress, // must match user's active address.
//     value: '0', // Only required to send ether to the recipient from the initiating external account.
//     data:
//       '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
//     chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };
  
//   // txHash is a hex string
//   // As with any RPC call, it may throw an error
//   const txHash = await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });

//   console.log(txHash)

//     swal({
//         title: "Payment Successfull",
//         text: "Happy Learning",
//         icon: "success",
//         button: "Go to Course",
//       });
//   }
//   return (
//     <div style = {{height : "100vh"}}>
      
      

//       <div class="container mt-5 px-5">
//     <div class="mb-4">
//         <h2>Pay Now ! </h2> 
//     </div>
//     <div class="row">
//         {/* <div class="col-md-8">
//             <div class="card p-3">
//                 <h6 class="text-uppercase">Payment details</h6>
//                 <div class="inputbox mt-3"> <input type="text" name="name" class="form-control" required="required" /> <span>Name on card</span> </div>
//                 <div class="row" >
//                     <div class="col-md-6">
//                         <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" required="required" />  <span>Card Number</span> </div>
//                     </div>
//                     <div class="col-md-6">
//                         <div class="d-flex flex-row">
//                             <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" required="required" /> <span>Expiry</span> </div>
//                             <div class="inputbox mt-3 mr-2"> <input type="password" name="name" class="form-control" required="required" /> <span>CVV</span> </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="mt-4 mb-4">
//                     <h6 class="text-uppercase">Billing Address</h6>
//                     <div class="row mt-3">
//                         <div class="col-md-6">
//                             <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" required="required" /> <span>Street Address</span> </div>
//                         </div>
//                         <div class="col-md-6">
//                             <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" required="required" /> <span>City</span> </div>
//                         </div>
//                     </div>
//                     <div class="row mt-2">
//                         <div class="col-md-6">
//                             <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" required="required" /> <span>State/Province</span> </div>
//                         </div>
//                         <div class="col-md-6">
//                             <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" required="required" /> <span>Zip code</span> </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>*/}
//             <div class="mt-4 mb-4 d-flex justify-content-between">  <button class="btn btn-success px-3" onClick = {pay} style={{"width": "40%","margin-left" : "30% "}}>Connect your wallet to pay!</button> </div>
//         </div>
//         {/* <div class="col-md-4">
//             <div class="card card-blue p-3 text-white mb-3"> <span>You have to pay</span>
//                 <div class="d-flex flex-row align-items-end mb-3">
//                     <h1 class="mb-0 yellow">Rs. 2000</h1> 
//                 </div> <span>Enjoy your classes after your complete payment </span> 

//                 <div class="hightlight"> <span>Enjoy the classes and expand your knowledge</span> </div>
//             </div>
//         </div>  */}
//     </div>
// </div>



//   )
// }

// export default PaymentModal;