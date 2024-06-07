const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let storedData = {name : 'Initial value'};

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/hello', (req, res) => {
    res.send(storedData);
});

app.post('/postHello', (req, res) => {

    const {name} = req.body;

    storedData[name] = name || 'world';

    res.send(`Hello, ${storedData[name]}`)
})

app.put('/updateHello', (req, res) => {
    const {updatedName} = req.body;

    if(!updatedName){
        return res.status(400).json({error: 'New value is required'});
    }

    if (storedData[updatedName]){
        return res.json({message : 'Name already exists.', existingName : updatedName});
    }

    storedData.name = updatedName;

    return res.json({message : 'value updated successfully.', updatedName});
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});


