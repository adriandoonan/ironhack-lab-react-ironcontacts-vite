import { useState } from "react";
import "./App.css";
import theContacts from "./contacts.json";

// {
//   "name": "Arnold Schwarzenegger",
//   "pictureUrl": "https://image.tmdb.org/t/p/w500/sOkCXc9xuSr6v7mdAq9LwEBje68.jpg",
//   "popularity": 18.216362,
//   "id": "4fe4d8ef-0fac-4bd9-8c02-ed89b668b2a9",
//   "wonOscar": false,
//   "wonEmmy": true
// },

function App() {
	const [contacts, setContacts] = useState(theContacts.slice(0, 5));

	const getRandomContact = () => {
		if (theContacts.length === 0) {
			console.log("no more contacts");
			return;
		}
		const currentContacts = contacts || [];
		const randomNumber = Math.floor(Math.random() * theContacts.length);
		const randomContact = () => theContacts.splice(randomNumber, 1);
		//console.log("curr", currentContacts);
		//console.log("rand", randomContact);

		const randomDoesNotExist = () => {
			const rando = randomContact();
			if (currentContacts.some((elem) => elem.id === rando[0].id)) {
				console.log("found dupe");
				return randomDoesNotExist();
			}
			console.log(rando);
			return rando[0];
		};

		setContacts([...currentContacts, randomDoesNotExist()]);
	};

	const sortByName = (a, b) => {
		return a.name.localeCompare(b.name);
	};

	const sortByPopularity = (a, b) => {
		return b.popularity - a.popularity;
	};

	const sortArray = (sortingFunction) => {
		const sorted = contacts.sort(sortingFunction);
		setContacts([...sorted]);
	};

	const removeContact = (contact) => {
		const filtered = contacts.filter((elem) => elem.id !== contact.id);

		if (!theContacts.find((elem) => elem.id === contact.id)) {
			theContacts.push(contact);
		}
		console.log(theContacts);
		console.log(contact);
		setContacts([...filtered]);
	};

	return (
		<div className="App">
			<h1>LAB | React IronContacts</h1>
			<button onClick={() => getRandomContact()}>Add random contact</button>
			<button onClick={() => sortArray(sortByPopularity)}>
				Sort by popularity
			</button>
			<button onClick={() => sortArray(sortByName)}>Sort alphabetically</button>
			<table>
				<thead>
					<tr>
						<th>Picture</th>
						<th>Name</th>
						<th>Popularity</th>
						<th>Won Oscar</th>
						<th>Won Emmy</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{contacts.map((contact) => (
						<tr className="celebrity-contact" key={contact.id}>
							<td>
								<img
									className="contact-photo"
									src={contact.pictureUrl}
									alt={contact.name}
								/>
							</td>
							<td>{contact.name}</td>
							<td>{contact.popularity.toFixed(2)}</td>
							<td>{contact.wonOscar && "🏆"}</td>
							<td>{contact.wonEmmy && "🌟"}</td>
							<td>
								<button onClick={() => removeContact(contact)}>Remove</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
