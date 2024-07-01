import { Link } from "react-router-dom";
import { Category, UserTaskCollections } from "../types";

interface CardProps {
  type: string;
  title?: string;
  subtitle?: string;
  body?: string;
  collection?: UserTaskCollections;
  category?: Category;
  registers?: number;
  keyIndex?: number;
}

export default function Card(props: CardProps) {
  let searchUtilData = {
    collection: "" + props.collection?.id,
    category: "" + props.category?.id,
  };

  function getTypeOfCard(type: string) {
    switch (type) {
      case "TaskChart":
        return (
          <Link className="cardComponent" to={"/tasks/search"} state={{ searchUtilData }}>
            {props.collection != undefined && props.category != undefined ? (
              <div key={props.keyIndex} className="infoCard">
                <span className="title">{props.category.name}</span>
                <span className="subtitle">{props.collection.name}</span>
              </div>
            ) : (
              <div key={props.keyIndex} className="cardNoCat">
                <span className="title">{props.collection?.name}</span>
              </div>
            )}
            <div className="registersCard">
              <span>{props.registers}</span>
            </div>
          </Link>
        );
      case "Info":
        return <></>;
      default:
        return <></>;
    }
  }
  return getTypeOfCard(props.type);
}
