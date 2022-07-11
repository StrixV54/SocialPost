import { useEffect, useState } from "react";
import Preloader from "./components/preloader";
import { createTodo, deleteTodo, readTodos, updateTodo } from "./functions";

function App() {
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState(null);
  const [currentId, setcurrentId] = useState(0);
  useEffect(() => {
    console.log("Id Changed");
    let currentTodo =
      currentId !== 0
        ? todos.find((todo) => todo._id === currentId)
        : { title: "", content: "" };
    setTodo(currentTodo);
  }, [currentId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
      // console.log(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearField);
    return () => window.removeEventListener("keydown", clearField);
  }, []);
  const clear = () => {
    setcurrentId(0);
    setTodo({ title: "", content: "" });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      const result = await createTodo(todo);
      setTodos([...todos, result]);
      clear();
    } else {
      await updateTodo(currentId, todo);
      const result = await readTodos();
      setTodos(result);
      clear();
    }
  };
  const deleteTodoHandler = async (id) => {
    await deleteTodo(id);
    // const todosCopy = [...todos];
    // todosCopy.filter((todo) => todo._id !== id);
    const result = await readTodos();
    setTodos(result);
    clear();
  };
  return (
    <div className="container">
      <div className="row">
        {/* <pre>{JSON.stringify(todo)}</pre> */}
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">Description</i>
              <input
                id="description"
                type="tel"
                className="validate"
                value={todo.content}
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="description">content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="wave-light wave-effect">Submit</button>
          </div>
        </form>
        {!todos ? (
          <Preloader />
        ) : todos.length > 0 ? (
          <ul className="collection">
            {todos.map((todo) => (
              <li
                key={todo._id}
                onClick={() => setcurrentId(todo._id)}
                className="collection-item"
              >
                <h5>{todo.title}</h5>
                <div>
                  {todo.content}
                  <a
                    href="#!"
                    onClick={() => deleteTodoHandler(todo._id)}
                    className="secondary-content"
                  >
                    <i className="material-icons">delete</i>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h5>Nothing to do</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
