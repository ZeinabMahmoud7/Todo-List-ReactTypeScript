import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const savedTodos = localStorage.getItem('todos');
  const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTask: Todo = {
        id: Date.now(),
        text: newTodo,
      };
      setTodos([...todos, newTask]);
      setNewTodo('');

      localStorage.setItem('todos', JSON.stringify([...todos, newTask]));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  return (
<div className="  mx-auto px-4 flex justify-center items-center ">
  <div className="max-w-md w-full p-4 bg-purple-200 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4 text-red-600 text-center">Todo List</h1>
    <div className="flex flex-col items-center mb-4">
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Add a new task"
        className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={addTodo}
        className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add
      </button>
    </div>
    <ul className="list-none p-0">
      {todos.map((todo) => (
        <li key={todo.id} className="p-2 border-b border-gray-300 text-gray-800">
          {todo.text}
        </li>
      ))}
    </ul>
  </div>
</div>
  );
};

export default TodoList;
