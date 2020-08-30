// 必要套件
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
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
const BookModel = mongoose.model('BookModel', BookSchema);

//graphql的schema
const typeDefs = gql`
	type Book {
		title: String
		author: String
	}
	type Query {
		books: [Book]
	}
	type Mutation {
		addBook(title: String, author: String): Book
	}
`;
const resolvers = {
	Mutation: {
		addBook: (parent, { title, author }, { db }) => {
			const book = new db();

			book.title = title;
			book.author = author;

			book.save(function (err) {
				if (!err) console.log('Success!');
			});
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
	}
});

// The `listen` method launches a web server.
server.listen(3000).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
