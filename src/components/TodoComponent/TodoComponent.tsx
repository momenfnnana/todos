import { Formik } from "formik";
import { useTodos } from "../../hooks";

interface ITodoItem {
  item: string;
  index: number;
  onRemoveHandler: (index: number) => void;
}

const TodoItem = ({ item, onRemoveHandler, index }: ITodoItem) => (
  <div className="flex justify-between bg-gray-500 font-bold py-2 px-4 text-white text-sm w-full rounded-lg my-2">
    <p className="flex flex-1">{item}</p>
    <p className="cursor-pointer" onClick={() => onRemoveHandler(index)}>
      X
    </p>
  </div>
);

export default function TodoComponent() {
  const { addTodo, removeTodo, todosList } = useTodos();

  const onSubmitHandler = (value: string) => {
    addTodo(value);
  };

  const onRemoveHandler = (index: number) => {
    removeTodo(index);
  };

  return (
    <div>
      {todosList.map((item, index) => (
        <TodoItem
          key={index}
          onRemoveHandler={onRemoveHandler}
          item={item}
          index={index}
        />
      ))}
      <Formik
        initialValues={{ todo: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmitHandler(values.todo);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row my-1 justify-between rounded-lg overflow-hidden">
              <input
                type="text"
                className="flex-1 text-gray-900 text-sm p-2.5 dark:bg-gray-700 font-bold"
                placeholder="type your todos.."
                name="todo"
                onChange={handleChange}
                value={values.todo}
              />
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-400 font-bold py-2 px-4 text-white text-sm w-full m-0"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
