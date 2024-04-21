import { useLocation } from "react-router-dom";

export default function TasksView() {
  let { state } = useLocation();
  return (
    <div>
      This is a New Page for the tasks with category: {state.collectionId} and a test Prop: {state.test}{" "}
    </div>
  );
}
