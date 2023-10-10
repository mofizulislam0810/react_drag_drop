import React, { useRef, useState } from 'react';
import CustomInput from './components/CustomInput';
import { v4 as uuidv4 } from "uuid";

type TodoType = {
  id: string;
  title: string;
  column: ColumnType;
  sortIndex: number;
};

const columns = {
  todo: "ToDo",
  doing: "Doing",
  done: "Done",
  trash: "Trash",
};

type Column = typeof columns;
type ColumnType = keyof Column;

const sampleTodos: TodoType[] = [];


function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState<TodoType[]>(sampleTodos);

  const columnMap = Object.keys(columns) as Array<ColumnType>;

  const draggedTodoItem = useRef<any>(null);

  //add todo function
  const handleAddTodo = () => {
    const todoPayload: TodoType = {
      id: uuidv4(),
      title: todoTitle,
      column: "todo",
      sortIndex: todos[todos.length + 1]?.sortIndex || todos.length + 1,
    };
    setTodos([...todos, todoPayload]);
    setTodoTitle("");
  };

  //column change function
  const handleColumnDrop = (column: ColumnType) => {
    const index = todos.findIndex(
      (todo) => todo.id === draggedTodoItem.current
    );
    const tempTodos = [...todos];
    tempTodos[index].column = column;
    setTodos(tempTodos);
  };

  //delete trash todo function
  const handleTrashDelete = () =>{
    let filterTodoList = todos.filter((todo:any)=> todo.column !== "trash")
    setTodos(filterTodoList)
  }

  return (
    <div className='mt-10'>
      <div className='min-h-screen'>
        <p className='text-xl text-center'>Drag & Drop</p>
        <p className='text-base text-center'>Lean Karban Board</p>
        <div className='flex justify-center my-2'>
          <CustomInput todoTitle={todoTitle} setTodoTitle={setTodoTitle} handleAddTodo={handleAddTodo} />
        </div>
        <div className='flex flex-wrap justify-center'>
          {columnMap.map((column, idx) => (
            <div className="" key={idx}>
              <h5 className='text-xl text-center bg-red-500 text-white rounded m-1 p-2'>{columns[column]}</h5>
              <div
                className="border-4 border-red-500 rounded m-1 w-[300px] min-h-[300px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleColumnDrop(column)}
              >
                {todos
                  .filter((todo) => todo.column === column)
                  .map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-start rounded bg-gray-200 p-2 m-2 cursor-move"
                      draggable
                      onDragStart={(e) => (draggedTodoItem.current = todo.id)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <h3>{todo.title}</h3>
                    </div>
                  ))}

                  {
                    columns[column] === "Trash" ? <div className='flex items-start justify-center '>
                    <button className='text-sm rounded w-full bg-red-500 p-2 m-2 text-white' onClick={()=>handleTrashDelete()}>
                      Delete
                    </button>
                  </div> : null
                  }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
