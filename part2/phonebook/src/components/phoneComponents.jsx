const Filter = ({filterName, handleFilterNameChange}) => {
  return (
    <div>
      filter shown with <input value={filterName} onChange={handleFilterNameChange} />
    </div>
  )
}

const PersonForm = ({handleSubmit, newName, handleNameChange, newPhoneNumber, handlePhoneNumberChange}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({filteredPersons}) => {
  return (
    <div>
      <table>
        <thead><tr><th>Name</th><th>Number</th></tr></thead>
        <tbody>{filteredPersons.map(person => <tr key={person.id}><td>{person.name}</td><td>{person.number}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export {
    Filter,
    PersonForm,
    Persons
}