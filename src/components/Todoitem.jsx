import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../store/slices/todo";

const Todoitem = ({ todo, handleEdit }) => {
  const dispatch = useDispatch();
  let opacity = todo.done ? 0.3 : 1;
  return (
    <div className="todoItem">
      <div className="todoContent">
        <input
          onChange={() =>
            dispatch(updateTodo({ id: todo.id, done: !todo.done }))
          }
          type="checkbox"
          checked={todo.done}
        />
        <span style={{ opacity: opacity }}>{todo.title}</span>
      </div>
      <div className="todoMeta">
        <button onClick={() => handleEdit(todo.id)} className="btn editButton">
          Edit
        </button>
        <button
          onClick={() => dispatch(deleteTodo(todo.id))}
          className="btn deleteButton"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todoitem;
