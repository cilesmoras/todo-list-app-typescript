import { Draggable } from "react-beautiful-dnd";
import { FiCheck, FiEdit3, FiTrash, FiX } from "react-icons/fi";
import { Todo } from "../model";
import Button from "./Button";
import { TodosActions } from "./TodoList";

type TodoCardProps = TodosActions & {
  index: number;
  data: Todo;
};

export default function TodoCard({
  index,
  data,
  handleDone,
  handleEdit,
  handleRemove,
}: TodoCardProps) {
  const { id, todo, isDone } = data;
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          className="todo-card"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <h3>{todo}</h3>
          <div className="action-buttons">
            <Button onClick={() => handleDone(id)}>
              {isDone ? <FiX /> : <FiCheck />}
            </Button>
            <Button onClick={() => handleEdit(data)}>
              <FiEdit3 />
            </Button>
            <Button onClick={() => handleRemove(id)}>
              <FiTrash />
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
