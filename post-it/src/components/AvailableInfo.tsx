import Card from "./Card";

interface AvailableInfoProps {
  lista: [];
}

export default function AvailableInfo(props: AvailableInfoProps) {
  return (
    <div>
      /** Create a list with some divs to show info about something, Example Info about tasks available for each category/collection */
      {props.lista.map((info, i) => {
        return <Card title={info} registers={i} />;
      })}
    </div>
  );
}
