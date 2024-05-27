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
            {props.collection != undefined && props.category != "" ? (
              <div key={props.keyIndex} className="infoCard">
                <span className="title">{props.category}</span>
                <span className="subtitle">{props.collection}</span>
              </div>
            ) : (
              <div key={props.keyIndex} className="cardNoCat">
                <span className="title">{props.collection}</span>
              </div>
            )}
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
  return getTypeOfCard(props.type);
}
