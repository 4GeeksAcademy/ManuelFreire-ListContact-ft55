// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect } from "react";

export const Home = () => {
	const apiUrl = import.meta.env.VITE_API_URL

	const navigate = useNavigate()

	console.log(apiUrl)
	// Access the global state and dispatch function using the useGlobalReducer hook.
	const { store, dispatch } = useGlobalReducer()

	function loadContacts() {
		console.log("Se cargaron los contactos")
		fetch(`${apiUrl}/agendas/manuel/contacts`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.contacts)

				dispatch({
					type: 'load_contact',
					payload: data.contacts
				})
			})
	}

	function deleteContact(id) {
		console.log('deleteContact ' + id)

		const deleteConfirm = confirm('Deseas eliminar permanentemente el contacto??')

		if (deleteConfirm) {
			fetch(`${apiUrl}/agendas/manuel/contacts/${id}`, {
				method: 'DELETE',
			})
				.then((response) => response)
				.then((data) => {
					console.log(data)

					const newArray = store.contacts.filter(item => item.id != id)
					console.log(newArray)

					dispatch({
						type: 'load_contact',
						payload: newArray
					})
				})
		}
	}
	useEffect(() => {
		loadContacts()

	}, [])

	return (
		<div className="container">
			<div className="ml-auto d-flex justify-content-between align-items-center">
				<h1>Lista de Contactos</h1>
				<Link to="/demo">
					<button className="btn btn-success">Add New Contact</button>
				</Link>
			</div>

			<br />
			<ul className="list-group">
				{/* Map over the 'todos' array from the store and render each item as a list element */}
				{store && store.contacts?.map((item) => {
					return (
						<li
							key={item.id}  // React key for list items.
							className="list-group-item d-flex justify-content-between border border-2 border-dark bg-light my-1"
						>
							<div className="d-flex py-2">
								<div className="px-3">
									<img src="https://picsum.photos/100/100" alt="" className="rounded-circle" />
								</div>
								<div>
									<p className="m-0 ">Name: {item.name}</p>
									<p className="m-0 ">Email: {item.email}</p>
									<p className="m-0 ">Address: {item.address}</p>
									<p className="m-0 ">Phone: {item.phone}</p>
								</div>
								
							</div>
							<div className="d-flex align-items-center ">
								<i onClick={() => navigate(`/edit/${item.id}`)} className="fa-solid fa-pencil mx-3"></i>
								<i onClick={() => deleteContact(item.id)} className="fa-solid fa-trash mx-3"></i>
							</div>
							
						</li>
					);
				})}
			</ul>


		</div>
	);
};