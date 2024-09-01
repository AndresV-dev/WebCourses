import { useEffect, useState } from "react";
import { SearchUtil, Task } from "../types";

import Select from "../components/Select";
import Button from "../components/Button";
import formatDate from "../util/formatter";
import { getTasksFilters } from "../api/featchApi";
import Modal from "./Modal";

interface HeaderProps {
  getTask: (task: Task[]) => void;
  page: number;
  size: number;
  label: string;
  greaterThanToday?: boolean;
  isShownModal?: boolean;
  shownText?: boolean;
  showCombo?: boolean;
  search?: SearchUtil;
}

export default function Header(props: HeaderProps) {
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<Array<any>>([]);
  const [comboIsShown, setComboIsShown] = useState(props.showCombo || false);
  const [isShownModal, setisShownModal] = useState(props.isShownModal);
  const [filterOptions] = useState([
    { id: "category", name: "Category" },
    { id: "priority", name: "Priority" },
    { id: "collection", name: "Collection" },
  ]);

  useEffect(() => {
    if (props.showCombo && props.search != undefined) {
      filter.sortBy = props.search.category != "undefined" ? "category" : "collection";
      filter.value = props.search.category != "undefined" ? props.search.category : props.search.collection;
      optionHandler(props.search.category != "undefined" ? "category" : "collection");
      searchTask("today");
    }
  }, [props.search]);

  const [filter, setFilter] = useState({
    sortBy: "",
    value: "",
  });

  function searchTask(dated: string) {
    let body = "";
    if (dated != "today" && dated != "tomorrow") {
      body = JSON.stringify({
        [filter.sortBy]: filter.value,
        createdAt: formatDate(new Date(), false),
        page: props.page === 0,
        size: props.size === 10,
      });
    } else {
      let today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      body = JSON.stringify({
        [filter.sortBy]: filter.value,
        endAt: props.label === "today" ? formatDate(new Date(), false) : props.label === "tomorrow" ? formatDate(tomorrow, false) : undefined,
        page: props.page === 0,
        size: props.size === 10,
      });
    }

    getTasksFilters(body).then((data) => props.getTask(data || []));
  }

  function optionHandler(filter: string) {
    switch (filter) {
      case "category":
        setSelectedFilterOptions(JSON.parse(sessionStorage.categories || "{}"));
        break;
      case "priority":
        setSelectedFilterOptions(JSON.parse(sessionStorage.priorities || "{}"));
        break;
      case "collection":
        setSelectedFilterOptions(JSON.parse(sessionStorage.collections || "{}"));
        break;
    }
    setComboIsShown(true);
  }

  return (
    <header className="header-dashboard">
      <div className="header-container">
        <div className="header-title">
          <h1>{props.label}</h1>
        </div>
        <div className="filter">
          <div className="search-title">
            <h2>Sort By:</h2>
          </div>
          <div>
            <Select
              name="sort"
              id={"filterOptions"}
              defaultValue={props.search ? (props.search.category != "undefined" ? "category" : "collection") : "option"}
              onChange={(e) => {
                optionHandler(e.target.options[e.target.selectedIndex].value);
                setFilter({ ...filter, sortBy: e.target.options[e.target.selectedIndex].value });
              }}
              options={filterOptions}
            />

            <Select className={comboIsShown ? "" : "isHidden"} name="options" defaultValue={props.search ? (props.search.category != "undefined" ? props.search.category : props.search.collection) : "option"} id={"selectedFilterOptions"} onChange={(e) => setFilter({ ...filter, value: e.target.options[e.target.selectedIndex].value })} options={selectedFilterOptions} />

            <Button label={"Search"} type="button" className={"search-button"} onClick={() => searchTask(props.greaterThanToday ? "greater" : "today")} />
          </div>
        </div>
      </div>
      {isShownModal ? (
        <Modal content="StaticModal" handleClose={() => {}} />
      ) : props.shownText ? (
        <div className="noTasksList">
          You Don't have any Task Now, Please Do a Search or Try and Generate a new Task <Button label={"Create New Task"} className={"search-button"} type="button" onClick={() => setisShownModal(!isShownModal)} />
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
