import React, { useState } from 'react';
import './App.css';
import { useQuery, gql, useMutation } from '@apollo/client';
const GET_BOOKS = gql`
	query books {
		books {
			title
			author
		}
	}
`;

const ADD_Book = gql`
	mutation AddBook($title: String, $author: String) {
		addBook(title: $title, author: $author) {
			title
			author
		}
	}
`;
function App() {
	const { loading, error, data } = useQuery(GET_BOOKS);
	const [AddBook, { bookdata }] = useMutation(ADD_Book);
	const [title, setTitle] = useState('qwe');
	const [author, setAuthor] = useState('qweqqq');

	function handleTitleChange(e) {
		setTitle(e.target.value);
	}

	function handleAuthorChange(e) {
		setAuthor(e.target.value);
	}

	function handleAddBook(e) {
		e.preventDefault();
		AddBook({ variables: { title, author } });
	}
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :( </p>;
	// console.log(data);
	return (
		<div className="App">
			<h1>{data.books.map((e) => e.title)}</h1>
			<h2>{data.books.map((e) => e.author)}</h2>
			請輸入書名<input type="text" value={title} onChange={handleTitleChange}></input> {title}
			<br />
			請輸入作者名稱<input type="text" value={author} onChange={handleAuthorChange}></input>
			{author}
			<br />
			<button onClick={handleAddBook}>建立新書</button>
		</div>
	);
}

export default App;
