interface CardProps {
  type: string;
  title?: string;
  subtitle?: string;
  body?: string;
  collection?: string;
  category?: string;
  registers?: number;
  keyIndex?: number;
}

export default function Card(props: CardProps) {
  function getTypeOfCard(type: string) {
    switch (type) {
      case "TaskChart":
        return (
          <div className="cardComponent">
            <div key={props.keyIndex} className="infoCard">
              <span className="title">{props.category}</span>
              {props.collection !== undefined ? <span className="subtitle">{props.collection}</span> : undefined}
            </div>
            <div className="registersCard">
              <span>{props.registers}</span>
            </div>
          </div>
        );
      case "Info":
        return <></>;
      default:
        return <></>;
    }
  }

  console.log("from Card" + JSON.stringify(props));
  return getTypeOfCard(props.type);
}
