import React, { useState } from "react";
import "./App.css";
import "./Index.css"
import TodoList from "./component/ToDo_List";
const App = () => {
  return (
    <div className="flex justify-center mt-20">
      <TodoList />
    </div>
  );
};

export default App;
