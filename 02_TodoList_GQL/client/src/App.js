import React from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
const GET_BOOKS = gql`
	query books {
		books {
			title
			author
		}
	}
`;
function App() {
	const { loading, error, data } = useQuery(GET_BOOKS);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :( </p>;
	console.log(data);
	return (
		<div className="App">
			<h1>{data.books.map((e) => e.title)}</h1>
			<h2>{data.books.map((e) => e.author)}</h2>
		</div>
	);
}

export default App;
