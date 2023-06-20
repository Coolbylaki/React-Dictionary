import React, { useState, useEffect } from "react";

interface Contact {
	id: string;
	fullName: string;
	phoneNumber: string;
}

const App: React.FC = () => {
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [contacts, setContacts] = useState<Contact[]>(() => {
		const savedContacts = localStorage.getItem("contacts");
		return savedContacts ? JSON.parse(savedContacts) : [];
	});

	useEffect(() => {
		const savedContacts = localStorage.getItem("contacts");
		console.log("Retrieved contacts from local storage:", savedContacts);
		if (savedContacts) {
			setContacts(JSON.parse(savedContacts));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("contacts", JSON.stringify(contacts));
		console.log("Saved contacts to local storage:", contacts);
	}, [contacts]);

	const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFullName(event.target.value);
	};

	const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!/^[a-zA-Zšđžćč\s]+$/.test(fullName)) {
			alert(
				"Please enter a valid name. Only alphabetic characters, spaces, š, đ, ž, ć, and č are allowed."
			);
			return;
		}

		if (!/^\+?\d+$/.test(phoneNumber)) {
			alert(
				'Please enter a valid phone number. Only numeric characters and "+" sign are allowed.'
			);
			return;
		}

		const newContact: Contact = {
			id: Date.now().toString(),
			fullName,
			phoneNumber,
		};

		setContacts([...contacts, newContact]);

		setFullName("");
		setPhoneNumber("");
	};

	const handleDelete = (id: string) => {
		const updatedContacts = contacts.filter((contact) => contact.id !== id);
		setContacts(updatedContacts);
	};

	return (
		<div className="container">
			<h1>Dictionary</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Full Name:
					<input type="text" value={fullName} onChange={handleFullNameChange} />
				</label>
				<label>
					Phone Number:
					<input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
				</label>
				<button type="submit">Add Contact</button>
			</form>
			<ul>
				{contacts.map((contact) => (
					<li key={contact.id}>
						<div className="contact-info">
							<span className="contact-name">{contact.fullName}</span>
							<span>- {contact.phoneNumber}</span>
						</div>
						<button className="delete-btn" onClick={() => handleDelete(contact.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
