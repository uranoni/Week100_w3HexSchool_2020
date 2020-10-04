// 必要套件
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/book', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

//mongoose的schema
const Schema = mongoose.Schema;

const BookSchema = new Schema({
	author: String,
	title: String
});
BookSchema.statics.findBookByTitle = function (title, callback) {
	// 這裡的 this 指該 collection (Animal)
	return this.findOne({ title }, callback);
};
const BookModel = mongoose.model('BookModel', BookSchema);

//graphql的schema
const typeDefs = gql`
	type Book {
		title: String
		author: String
	}
	type Query {
		books: [Book]
		findBookByTitle(title: String): Book
	}
	type Mutation {
		addBook(title: String, author: String): Book
		updateBook(title: String, author: String): Book
		deleteBook(title: String): Book
	}
`;
const resolvers = {
	Query: {
		books: async (parent, { title, author }, { db }) => {
			const books = await db.find();
			return books;
		},
		findBookByTitle: async (parent, { title }, { db }) => {
			const result = db.findBookByTitle(title, function (err) {
				if (err) {
					return err;
				}
			});
			return result;
		}
	},
	Mutation: {
		addBook: (parent, { title, author }, { db }) => {
			const book = new db();

			book.title = title;
			book.author = author;

			book.save(function (err) {
				if (!err) console.log('Success!');
			});
			return book;
		},
		updateBook: async (parent, { title, author }, { db }) => {
			const book = await db.findOneAndUpdate({ author }, { title }, { new: true });
			return book;
		},
		deleteBook: async (parent, { title, author }, { db }) => {
			const book = await db.findOneAndRemove({ title });
			return book;
		}
	}
};
//把model包進context中
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		const db = BookModel;
		return { db };
	},
	cors: true
});

// The `listen` method launches a web server.
server.listen(3000).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
