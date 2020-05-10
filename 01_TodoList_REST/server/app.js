const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uuid = require('./utils/uuid')
var cors = require('cors');
var app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todolist01', {});

//bodyParser 前端傳過來的資料要做解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//
var Schema = new mongoose.Schema(
	{
		title: String,
		text: String,
		completed: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

var userSchema = new mongoose.Schema(
	{
		name: {type:String,unique:true},
		tokens: [{
			token:String
		}]
	},
	{
		timestamps: true
	}
);

var Todo = mongoose.model('Todo', Schema);
var User = mongoose.model('User', userSchema)

app.post('/create', async (req, res) => {
	const { title, text } = req.body;
	const newToda = new Todo({ title, text });
	const result = await newToda.save();
	res.send(result);
});

app.get('/findall', (req, res) => {
	Todo.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.status(404).send('not found');
		});
});

app.delete('/removeTask/:id', async (req, res) => {
	try {
		console.log(req.params.id)
		const result = await Todo.findOneAndDelete({ _id: req.params.id })
		res.send(result)
	} catch (error) {
		res.send(error)
	}
	
})

app.patch('/updateTask/:id', async (req, res) => {
	try {
		console.log(req.params.id)
		const result = await Todo.findOneAndUpdate({ _id: req.params.id.toString() }, {
			title: req.body.newTitle,
			text: req.body.newText
		})
		res.send(result)

	} catch (error) {
		res.send(error)
	}
})


app.post('/user', async (req, res) => {
	try {
		const { name } = req.body
		const token = uuid()
		const tokens = []
		tokens.push({token})
		const user = new User({ tokens, name })
		const result = await user.save()
		res.send(result)
	} catch (error) {
		res.status(401).send(error)
	}
})

app.post('/verifyUser', async (req, res) => {
	try {
		const { name } = req.body
		const token = uuid()
		const user = await User.findOne({ name })
		user.tokens.push({ token })
		const result = await user.save()
		res.send({token})
	} catch (error) {
		res.status(404).send(error)
	}
})
app.listen(20201, () => {
	console.log('http://localhost:20201');
});
