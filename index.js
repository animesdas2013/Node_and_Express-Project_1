const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let storedData = [];

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/hello', (req, res) => {
    res.send(storedData);
});

app.post('/postHello', (req, res) => {

    const {name} = req.body;

    storedData.push(name || 'world');

    res.send(`Hello, ${name}`);
})

app.put('/updateHello', (req, res) => {
    const {existingName, updatedName} = req.body;

    if (!existingName || !updatedName){
        return res.status(400).json({error : 'Both existing and new values are required'});
    }

    const index = storedData.indexOf(existingName);
    if(index === -1){
        return res.status(400).json({error: 'Existing value not found'});
    }

    storedData[index] = updatedName;

    return res.json({message: 'Value updated successfully', updatedName});

});

app.delete('/deleteHello', (req, res) => {
    const {name} = req.body;

    if(!name){
        return res.status(400).json({error : 'Name is required for deletion'});
    }

    const index = storedData.indexOf(name);
    if(index === -1){
        return res.status(404).json({error: 'Name not found for deletion'});
    }

    storedData.splice(index, 1);

    return res.json({message : 'Value deleted successfully', deletedName: name});
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});


