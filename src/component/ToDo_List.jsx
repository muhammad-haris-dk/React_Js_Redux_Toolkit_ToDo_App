import React, { useEffect, useState } from "react";
import empty from "../assets/empty.jpg";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import {
  addTodo,
  setTodoList,
  toggleCompleted,
  updateTodo,
  theme_toggle_dynamic
} from "../store/Slice";
import { Switch } from "@mui/joy";
import { DarkMode } from "@mui/icons-material";

function TodoList() {
  const dispatch = useDispatch();
  const todo_List = useSelector((state) => state.todo.todoList);
  const state_value = useSelector((state)=> state.todo)
  // console.log(state_value)
  const [condition, setCondition] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [data, setData] = useState(null);
  // console.log(todo_List);
  useEffect(() => {
    if (todo_List.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todo_List));
    }
  }, [todo_List]);
  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const add_Todo_Handle = (otask) => {
    if (otask.trim().length === 0) {
      alert("Please enter a task");
    } else {
      console.log(dispatch(addTodo({ task: otask, id: Date.now() })));
      setNewTask("");
    }
  };
  const handleUpdateToDoList = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(updateTodo({ task: task, id: id }));
      setNewTask("");
      setData(false);
    }
  };
  const handleDeleteToDo = (id) => {
    const updatedToDoList = todo_List.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
    setCondition(false);
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };
  const theme_toggle_handle_dynamic = () => {
    dispatch(theme_toggle_dynamic())
  }
  const bg_color = state_value.theme === "dark" ? "transparent-black" : "transparent";
  const color = state_value.theme === "dark" ? "text-white" : "text-black"
  const border = state_value.theme === "dark" ? "border-white" : "border-slate-500"
  const background = state_value.theme === "dark" ? "bg-black" : "bg-black"
  const colory = state_value.theme === "dark" ? "text-white" : "bg-white"
  return (
    <div className={`border duration-500 border-slate-500 p-5 rounded-lg h-[500px] ${bg_color}`}>
      <div className="flex">
        <div>
          <h1 className={`text-2xl ${color} duration-500 mb-5`}>This is my Persnol ToDo App?</h1>
        </div>
        <div className="mt-1 mx-2">
          <button className={`border ${background} ${colory} ${border} px-3 rounded-md`} onClick={theme_toggle_handle_dynamic}>
            {state_value.theme}
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex justify-center items-center">
          <TextField
            id="outlined-basic"
            placeholder={
              data ? "Update Your Task Here?" : "Enter Your Task Here?"
            }
            color="success"
            sx={state_value.theme === "dark" ? {color:"white"} : {color:"black"}}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            onClick={() => {
              data
                ? handleUpdateToDoList(data.id, newTask)
                : add_Todo_Handle(newTask);
            }}
            variant="contained"
            color="success"
            sx={{ height: "54px" }}
          >
            {data ? "Update Task" : "Add Task"}
          </Button>
        </div>
        <div className={`border ${border} duration-500 mt-5 border-e-0 border-s-0 border-t-0`}></div>
        <div className={`border rounded-md duration-500 ${border} mt-5 h-[300px] ok overflow-auto`}>
          {todo_List.length == 0 ? (
           <div className="flex justify-center items-center h-full">
            <h1  className={`text-3xl ${color}`}>Entired Feild Is Empty</h1>
           </div>
          ) : (
            <div className={`duration-500`}>
              {todo_List.map((todo) => (
                <div
                  key={todo.id}
                  className={`border duration-500 px-5 border-e-0 border-s-0 border-t-0 ${border}`}
                >
                  {data ? (
                    <div className="flex justify-between">
                      <div>
                        <p className={`duration-500 ${border} py-5  text-lg  ${color}`}>
                          {todo.task}
                        </p>
                      </div>
                      <div className="flex text-end items-center ">
                        <Button
                          variant="contained"
                          sx={{ paddingY: "15px" }}
                          color="error"
                          onClick={() => handleDeleteToDo(todo.id)}
                        >
                          <BsTrash />
                        </Button>
                        <Button
                          onClick={() => {
                            setCondition(true);
                            setData(todo);
                            setNewTask(todo.task);
                          }}
                          variant="contained"
                          sx={{ paddingY: "15px" }}
                          color="success"
                        >
                          <TiPencil />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div>
                        <p className={`duration-500 ${border} py-5  text-lg  ${color}` }>
                          {todo.task}
                        </p>
                      </div>
                      <div className="flex text-end items-center ">
                        <Button
                          variant="contained"
                          sx={{ paddingY: "15px" }}
                          color="error"
                          onClick={() => handleDeleteToDo(todo.id)}
                        >
                          <BsTrash />
                        </Button>
                        <Button
                          onClick={() => {
                            setCondition(true);
                            setData(todo);
                            setNewTask(todo.task);
                          }}
                          variant="contained"
                          sx={{ paddingY: "15px" }}
                          color="success"
                        >
                          <TiPencil />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
