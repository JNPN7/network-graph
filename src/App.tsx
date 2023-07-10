import { Route, Routes } from "react-router-dom";

import NavBar from "@/components/NavBar";
import ChartView from "@/features/chartView/ChartView";
import TableView from "@/features/tableView/TableView";
import { Person, selectPerson } from "@/store/personSlice";
import ErrorPage from "./ErrorPage";

import "./App.css";
import { useSelector } from "react-redux";
import { useState } from "react";


function App() {
  const people: Person[] = useSelector(selectPerson);

  const [newID, setNewID] = useState(people.length + 1);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<TableView newID={newID} setNewID={setNewID} />} />
        <Route path="/table" element={<TableView newID={newID} setNewID={setNewID} />} />
        <Route path="/chart" element={<ChartView />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
