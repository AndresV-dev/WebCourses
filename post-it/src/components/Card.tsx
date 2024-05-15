interface CardProps {
  type: string;
  title?: string;
  subtitle?: string;
  body?: string;
  collection?: string;
  category?: string;
  registers?: number;
  key?: number;
}

export default function Card(props: CardProps) {
  function getTypeOfCard(type: string) {
    switch (type) {
      case "TaskChart":
        return (
          <div className="cardComponent">
            <div key={props.key}>
              <span>{props.category}</span>
              {props.collection !== undefined ? <span>{props.collection}</span> : undefined}
            </div>
            <div>
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
