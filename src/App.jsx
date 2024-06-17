/* eslint-disable react/prop-types */
import HomePage from './Pages/HomePage';
import NotFoundPage from './Pages/NotFoundPage';
import TodoDetailsPage from './Pages/TodoDetailsPage';
import TodosPage from './Pages/TodosPage';
import './index.css';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import CreateTodoPage from './Pages/CreateTodoPage';

function App() { 
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos">
        <Route index element={<TodosPage />} />
          <Route path=":todoId" element={<TodoDetailsPage />} />
          <Route path="create" element={<CreateTodoPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

}
export default App;
