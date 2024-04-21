import { Todo } from "../model";

type Action = {
  type: "add" | "remove" | "done" | "update";
  payload: { id: number; todo?: string; isDone?: false };
};

export default function todosReducer(state: Todo[], action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      return [...state, { id: payload.id, todo: payload.todo, isDone: false }];
    }
    case "update": {
      const newTodos = state.map((todo) => {
        return todo.id === payload.id
          ? { ...todo, todo: payload.todo }
          : { ...todo };
      });
      console.log(newTodos);
      return newTodos;
    }
    case "remove": {
      return state.filter((todo) => todo.id !== payload.id);
    }
    case "done": {
      return state.map((todo) => {
        return todo.id === payload.id
          ? { ...todo, isDone: !todo.isDone }
          : { ...todo };
      });
    }
    default: {
      throw Error("Unknown action");
    }
  }
}
