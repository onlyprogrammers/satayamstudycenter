const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const allowedOrigins = ['https://your-react-app-domain.com'];




const mongoDBUrl = "mongodb+srv://lpubg2922:Ajeet2002@cluster0.vxn9k0g.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



const Schema = mongoose.Schema;

const exampleSchema = new Schema({
  name: String,
  age: Number,
});

const ExampleModel = mongoose.model('Example', exampleSchema);



const app = express();
const port = process.env.PORT || "0.0.0.0";

app.use(cors({
  origin: allowedOrigins,
}));

app.get('/', (req, res) => {
  res.send('Hello, Express on Glitch!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/get',function(req,res){
  res.send({"name":"ajeet"})
})


app.post('/create', async (req, res) => {
  const data = req.body; // Assuming you're sending data in the request body
  try {
    const example = new ExampleModel(data);
    await example.save();
    res.status(201).send('Document created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating document');
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const data = await ExampleModel.find({}, {}); // Retrieve all documents
    res.json(data); // Send the data as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});