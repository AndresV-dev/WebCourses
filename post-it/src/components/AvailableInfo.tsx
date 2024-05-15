import { AvailableInfoType } from "../types";
import Card from "./Card";

interface AvailableInfoProps {
  lista: Array<AvailableInfoType>;
}

export default function AvailableInfo(props: AvailableInfoProps) {
  return (
    <>
      {props.lista !== undefined && props.lista.length > 0 ? (
        <div>
          /** Create a list with some divs to show info about something, Example Info about tasks available for each category/collection */
          {props.lista.map((info, i) => {
            return <Card type="TaskChart" title={info.collection} subtitle={info.category} registers={info.registers} key={i} />;
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
