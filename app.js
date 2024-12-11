const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const port = 3000

// app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define a route to serve the HTML file
app.get('/', (req, res) => {
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, 'Kajita.html'));
});


// Define a route to serve the HTML file
app.post('/charge', async (req, res) => {
    // Send the HTML file as the response
    console.log(req.body);
    const { kushkiToken, kushkiPaymentMethod, ...metadata } = req.body;
    
    try {
        const response = await axios.post('https://api-uat.kushkipagos.com/card/v1/charges', {
            token: kushkiToken,
            amount: {
                subtotalIva: 0,
                subtotalIva0: 1000,
                ice: 0,
                iva: 0,
                currency: "USD"
            },
            metadata: {
                ...metadata
            },
            fullResponse: "v2"
        }, {
            headers: {
                'Private-Merchant-Id': 'MerchantID'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})