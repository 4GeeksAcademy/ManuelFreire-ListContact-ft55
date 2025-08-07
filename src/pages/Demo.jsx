import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const Demo = () => {

  const apiUrl = import.meta.env.VITE_API_URL

  const { store, dispatch } = useGlobalReducer()
  
  const {id} = useParams()

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const navigate = useNavigate()

  function handleSubmit() {
    fetch(`${apiUrl}/agendas/manuel/contacts${!id ? '' : '/' + id}`, {
				method: !id ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data)

          navigate('/')

					const newArray = store.contacts.filter(item => item.id != id)
					console.log(newArray)

					dispatch({
						type: 'load_contact',
						payload: newArray
					})
				})
  }

  useEffect(() => {
    if (store.contacts) {
      if (store.contacts.length > 0 && id) {
        const result = store.contacts.find(item => item.id == id)
        if (result) {
          setContact(result)
        }
      }
    }
  },[id, store.contact])

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-3">{!id ? 'Agregar Nuevo Contacto':'Editar Contacto' }</h1>
      <div className="mb-3">
        <label htmlFor="formInputName" className="form-label">Nombre Completo</label>
        <input type="text" className="form-control" id="formInputName" value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} placeholder="Ingresar Nombre Completo" />
      </div>
      <div className="mb-3">
        <label htmlFor="formInputEmail" className="form-label">Correo</label>
        <input type="email" className="form-control" id="formInputEmail" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} placeholder="Ingresar Correo" />
      </div>
      <div className="mb-3">
        <label htmlFor="formInputPhone" className="form-label">Telefono</label>
        <input type="tel" className="form-control" id="formInputPhone" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} placeholder="Ingresar numero de telefono" />
      </div>
      <div className="mb-3">
        <label htmlFor="formInputAddress" className="form-label">Direccion</label>
        <input type="text" className="form-control" id="formInputAddress" value={contact.address} onChange={(e) => setContact({...contact, address: e.target.value})} placeholder="Ingresar Direccion" />
      </div>
      <button type="button" onClick={handleSubmit} className="w-100 btn btn-primary">
        Save
      </button>
      <div className="ml-auto">
        <Link to="/">or get back to contacts</Link>
      </div>
    </div>
  );
}; 