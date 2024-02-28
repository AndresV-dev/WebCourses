import { useState } from "react";
import { Task } from "../types";

import Select from "../components/Select"
import Button from "../components/Button";
import formatDate from "../util/formatter";

interface HeaderProps {
    getTask: (task: Task[]) => void;
    label: string
}

export default function Header(props: HeaderProps){
    const [selectedFilterOptions, setSelectedFilterOptions] = useState<Array<any>>([]);
    const [filterOptions] = useState([
      {id: "category",name: "Category"}, {id: "priority",name: "Priority"}, {id: "collection",name: "Collection"}
    ])
  
    const [filter, setFilter] = useState({
      sortBy: "",
      value: ""
    });


    function searchTask(){
        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1)
        let body = JSON.stringify({
          [filter.sortBy] : filter.value,
          endAt: props.label === "Today" ? formatDate(new Date(), false) : props.label === "Tomorrow" ? formatDate(tomorrow, false) : undefined
        })

        fetch('http://localhost:8081/v1/tasks/list/filtered', {
          method: 'POST',
          headers: new Headers({
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + ( sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : process.env.VITE_TOKEN)
          }),
          body: body
        })
        .then(response => response.json())
        .then(res => props.getTask(res))
        .catch(error => alert(error));
        
      }

    function optionHandler(filter: string) {
      switch(filter){
        case "category":
          setSelectedFilterOptions(JSON.parse(sessionStorage.getItem("categories") || ""));
          break;
        case "priority":
          setSelectedFilterOptions(JSON.parse(sessionStorage.getItem("priorities") || ""));
          break;
        case "collection":
          setSelectedFilterOptions(JSON.parse(sessionStorage.getItem("collections") || ""));
          break;
      }
    }

    return(
    <header className="header-dashboard">
    <h1>{props.label}</h1>
    <div className="filter"> 
      <h2>Sort By:</h2>
      <div>
        <Select 
        name="sort" 
        id={"filterOptions"} 
        defaultValue={"option"} 
        onChange={(e) => {optionHandler(e.target.options[e.target.selectedIndex].value); setFilter({...filter, sortBy:e.target.options[e.target.selectedIndex].value})}} 
        options={filterOptions} />

        <Select 
        name="options" 
        defaultValue="option" 
        id={"selectedFilterOptions"} 
        onChange={(e) => setFilter({...filter, value:e.target.options[e.target.selectedIndex].value})}
        options={selectedFilterOptions} />
        
        <Button label={"Search"} type="button" className={"search-button"} onClick={() => searchTask()}/>
      </div>
    </div>
  </header>)
}