import { useEffect, useState } from "react";

const setlocalStorage = (key: "todos", value: string[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const useTodos = () => {
  const [todosList, setTodosList] = useState<any[]>([]);
  const [refetchData, setRefetchData] = useState<boolean>(false);

  const addTodo = (item: string) => {
    setlocalStorage("todos", [...todosList, item]);
    setRefetchData((currentState) => !currentState);
  };

  const removeTodo = (index: number) => {
    const items = todosList.filter((_, idx) => idx !== index);
    setlocalStorage("todos", items);
    setRefetchData((currentState) => !currentState);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodosList(items);
  }, [refetchData]);

  return { todosList, addTodo, removeTodo };
};

export default useTodos;
