import React, { useEffect, useState } from "react";
import Todoitem from "./Todoitem";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, fetchTodos } from "../store/slices/todo";
import { createTodo } from "../store/slices/todo";

const Todoapp = () => {
  const state = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  console.log(state.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const [todoItem, setTodoItem] = useState("");
  const [editingId, setEditimgId] = useState(null);
  const handleInputChange = (e) => {
    setTodoItem(e.target.value);
  };
  const handleSubmit = () => {
    if (editingId) {
      dispatch(editTodo({ id: editingId, title: todoItem }));
    } else {
      let newtodoObj = {
        title: todoItem,
        done: false,
      };
      dispatch(createTodo([newtodoObj]));
    }
    setTodoItem("");
    setEditimgId(null);
  };

  const handleEdit = (id) => {
    setEditimgId(id);
    let editingTodo = state.todos.find((todo) => todo.id === id);
    setTodoItem(editingTodo.title);
  };
  return (
    <div className="todoApp">
      <form onSubmit={handleSubmit}>
        <div className="todoForm">
          <input
            onChange={handleInputChange}
            className="todoInput"
            type="text"
            name="todoItem" // Add a name attribute for the input
            value={todoItem}
            placeholder="Enter your todo here" // Add a placeholder for better guidance
          />
          <button type="submit" className="btn addButton">
            {editingId ? "Edit" : "Add"} Todo
          </button>
        </div>
      </form>

      <div className="todoList">
        {state.todos.map((todo) => (
          <Todoitem key={todo.id} todo={todo} handleEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default Todoapp;
