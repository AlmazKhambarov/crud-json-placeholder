import React from "react";

const EditTodo = ({
  handleEditFormSubmit,
  editedTaskTitle,
  setEditedTaskTitle,
  editedTaskCompleted,
  setEditedTaskCompleted,
  setEditTaskId,
}) => {
  return (
    <div>
      <form onSubmit={handleEditFormSubmit}>
        <input
          type="text"
          value={editedTaskTitle}
          onChange={(e) => setEditedTaskTitle(e.target.value)}
        />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={editedTaskCompleted}
            onChange={(e) => setEditedTaskCompleted(e.target.checked)}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setEditTaskId(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
