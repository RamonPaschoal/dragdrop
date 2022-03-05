import React from 'react';

export default function Form({ contact, changeNameValue}) {
    const { nome, telefone, id } = contact;
    const [inputName, setInputName] = React.useState(nome)
    const [inputPhone, setInputPhone] = React.useState(telefone)

    React.useEffect(() => {
      setInputName(nome);
      setInputPhone(telefone);
    }, [nome, telefone])

    const handleChangeName = event => {
        setInputName(event.target.value)
    }

    const handleChangePhone = event => {
        setInputPhone(event.target.value)
    }

    return (
        <form>
        <h3>Editar contato {nome}</h3>
        <label>
          <input
            id="input-name"
            className="add-input"
            placeholder="Nome"
            type="text"
            value={inputName}
            onChange={handleChangeName}
          />
        </label>
        <label>
          <input
            id="input-telefone"
            className="add-input"
            placeholder="Telefone"
            type="text"
            value={inputPhone}
            onChange={handleChangePhone}
          />
        </label>
        <button
          type="button"
          className="add-button"
          onClick={() => changeNameValue(id, inputName, inputPhone)}
        >
          Enviar
        </button>
      </form>
    )
}