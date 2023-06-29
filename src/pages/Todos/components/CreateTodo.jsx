import React from 'react'

const CreateTodo = ({handleCreate, newTitle, setNewTitle}) => {
  return (
    <div>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder='title' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
        <input type="checkbox"/>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateTodo
