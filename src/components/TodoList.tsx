import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import TodoCard from "./TodoCard";

export type TodosActions = {
  handleDone: (id: number) => void;
  handleEdit: (todo: Todo) => void;
  handleRemove: (id: number) => void;
};

type TodoListProps = TodosActions & {
  todos: Todo[];
};

export default function TodoList({
  todos,
  handleDone,
  handleEdit,
  handleRemove,
}: TodoListProps) {
  const pendingTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <div className="todo-container">
      <Droppable droppableId="Todos">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3>To-dos</h3>
            {pendingTodos.map((todo, index) => (
              <TodoCard
                index={index}
                key={todo.id}
                data={todo}
                handleDone={handleDone}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="DoneTodos">
        {(provided) => (
          <div
            className="done-todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3>Completed</h3>
            {doneTodos.map((todo, index) => (
              <TodoCard
                index={index}
                key={todo.id}
                data={todo}
                handleDone={handleDone}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
