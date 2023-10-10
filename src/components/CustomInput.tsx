import React from 'react'
import { FaCirclePlus } from "react-icons/fa6";
type Props = {
    todoTitle : string,
    setTodoTitle: any,
    handleAddTodo: () => void
}

const CustomInput = ({ todoTitle ,setTodoTitle, handleAddTodo }: Props) => {
    //handle name change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.target.value);
    };

    return (
        <div className="relative max-w-lg">
            <input
                className="w-full rounded-full border-2 bg-gray p-3 pe-32 text-sm font-medium"
                id="email"
                type="text"
                placeholder="Please add todo list"
                value={todoTitle}
                onChange={handleNameChange}
            />

            <button
                className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-red-500 px-5 py-3 text-sm font-medium text-white transition"
                onClick={handleAddTodo}
                disabled = {todoTitle.length === 0 && true}
            >
                <FaCirclePlus />
            </button>
        </div>
    )
}

export default CustomInput