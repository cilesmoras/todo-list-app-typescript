import { useReducer, useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import Button from "./components/Button";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import todosReducer from "./reducers/todosReducer";

function App() {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [state, dispatch] = useReducer(todosReducer, []);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputRefCurrent = inputRef.current;
    if (!inputRefCurrent || !inputRefCurrent.value) return;
    dispatch({
      type: "add",
      payload: {
        id: Date.now(),
        todo: inputRefCurrent?.value,
      },
    });
    inputRefCurrent.value = "";
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputRefCurrent = inputRef.current;
    if (!inputRefCurrent) return;
    dispatch({
      type: "update",
      payload: {
        id: selectedTodo?.id as number,
        todo: inputRefCurrent.value,
      },
    });

    inputRefCurrent.value = "";
    setSelectedTodo(undefined);
  }

  function handleDone(id: number) {
    dispatch({
      type: "done",
      payload: {
        id,
      },
    });
  }

  function handleEdit(todo: Todo) {
    setSelectedTodo(todo);
    const inputRefCurrent = inputRef.current;
    if (!inputRefCurrent) return;
    inputRefCurrent.value = todo?.todo as string;
  }

  function handleRemove(id: number) {
    dispatch({
      type: "remove",
      payload: {
        id,
      },
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    return selectedTodo === undefined ? handleAdd(e) : handleUpdate(e);
  }

  function onDragEnd(result: DropResult) {
    // const pendingTodos = state.filter((todo) => !todo.isDone);
    // const doneTodos = state.filter((todo) => todo.isDone);
    const { draggableId, source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // let add,
    //   pending = pendingTodos,
    //   done = doneTodos;

    if (
      source.droppableId === "Todos" &&
      destination.droppableId === "DoneTodos"
    ) {
      // add = pending[source.index];
      // pending.splice(source.index, 1);
      dispatch({
        type: "done",
        payload: {
          id: Number(draggableId),
        },
      });
    }

    if (
      destination.droppableId === "Todos" &&
      source.droppableId === "DoneTodos"
    ) {
      // add = pending[source.index];
      // pending.splice(source.index, 1);
      dispatch({
        type: "done",
        payload: {
          id: Number(draggableId),
        },
      });
    }

    // if (destination.droppableId === "Todos") {
    //   pending.splice(source.index, 0, add);
    // } else {
    //   done.splice(source.index, 0, add);
    // }

    console.log(result);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="taskify-form"
          action=""
        >
          <InputField ref={inputRef} placeholder="Enter a task" />
          <Button type="submit">
            {selectedTodo === undefined ? "Add" : "Update"}
          </Button>
        </form>
        <TodoList
          todos={state}
          handleDone={handleDone}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
