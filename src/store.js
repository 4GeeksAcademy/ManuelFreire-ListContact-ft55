export const initialStore=()=>{
  return{
    message: null,
    todos: [],
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'load_contact':

      return {
        ...store,
        contacts: action.payload
      };


    case 'delete_contact':

      const { indexDelete } = action.payload

      console.log('STORE DELETE CONTACT' + indexDelete)

      return {
        ...store,
        contacts: store.contacts.filter((contacto, index) => index != indexDelete )
      };

    default:
      throw Error('Unknown action.');
  }    
}
