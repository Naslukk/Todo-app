import React,{ useState } from "react";

function NewTodoForm({onSubmit}) {
    const [newItem, setNewItem] = useState();

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit(newItem);

        setNewItem('');
    }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">Add Todo</label>
      <input
        name="todo"
        id="todo"
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit" className="btn">
        submit
      </button>
    </form>
  );
}

export default NewTodoForm;
