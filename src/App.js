import React from 'react';
import { parse } from 'papaparse';
import "./App.css"
import Form from "./form"

export default function App() {
  const [contacts, setContacts] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [addNewPerfil, setAddNewPerfil] = React.useState({ nome: "", telefone: "" })

  const removeRow = (id) => {
    return document.getElementById(`tr${id}`).remove();
  }


  const changeNameValue = (id, nome, telefone) => {
    setContacts((prevContacts) => prevContacts.map(contact => {
      if(contact.id === id) {
        return {
          id,
          nome,
          telefone,
        }
      }
      return contact
    }))
    setSelected(null)
  }

  const addPerfil = () => {
    const newId = contacts[contacts.length - 1].id + 1;

    setContacts([...contacts, {
      id: newId,
      ...addNewPerfil
    }])

    setAddNewPerfil({ nome: "", telefone: "" })
  }

  return (
    <div className='container'>
      <header>
        <h1>Drag and Drop</h1>
      </header>

      <h4>Leitor de CSV</h4>
      <p>Manipule seus arquivos em CSV</p>
    
      <div className="box" draggable="true"

        onDragOver={(e) => {
          e.preventDefault();
        }}
        
        onDrop={(e) => {
          e.preventDefault();

          Array.from(e.dataTransfer.files)
            .filter(file => file.type === 'text/csv')
            .forEach(async file => {
              const text = await file.text()
              const result = parse(text, { header: true })
              setContacts(() => [...result.data]);
            })
        }}
        >Solte o arquivo aqui
      </div>
      <form>
        <h3>Adicionar Contato</h3>
        <label className="form-label" for="input-add-name">
          <input
            id="input-add-name"
            className="add-input"
            autoComplete="off"
            placeholder="Nome"
            type="text" value={ addNewPerfil.nome }
            onChange={ ({ target }) => setAddNewPerfil({ ...addNewPerfil, nome: target.value }) }
          />
        </label>
        <br />
        <label className="form-label" for="input-add-telefone">
          <input
            id="input-add-telefone"
            className="add-input"
            placeholder="Telefone - (xx) xxxxx-xxxx"
            type="tel" value={ addNewPerfil.telefone }
            autoComplete="off"
            pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            onChange={ ({ target }) => setAddNewPerfil({ ...addNewPerfil, telefone: target.value }) }
          />
        </label>
        <br />
        <button type="button" className="add-button" onClick={ addPerfil }>Enviar</button>      </form>
      <table className='Table'>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Editar</th>
        </tr>
        {contacts.map(contact =>
          <tr id={`tr${contact.id}`}>
            <td key={`key-${contact.id}`} id={contact.id}>{contact.nome}</td>
            <td id={contact.telefone}>{contact.telefone}</td>
            <td id="images">
              <img
                src="https://cdn-icons-png.flaticon.com/512/18/18297.png?w=826"
                alt="Trash"
                width="30"
                height="29"
                onClick={() => removeRow(contact.id)}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                alt="Edit"
                width="30"
                height="29"
                onClick={() => setSelected(contact)}
              />
            </td>
          </tr>
        )}
        <tr>
        </tr>
      </table>
      { selected && <Form changeNameValue={changeNameValue} contact={ selected }/> }
    </div>
  )
}
