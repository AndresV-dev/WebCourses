import { AvailableInfoType } from "../types";
import Button from "./Button";
import Card from "./Card";

interface AvailableInfoProps {
  lista: Array<AvailableInfoType>;
}

export default function AvailableInfo(props: AvailableInfoProps) {
  console.log(props.lista);
  return (
    <>
      {props.lista !== undefined && props.lista.length > 0 ? (
        <div>
          {/*
          Create a list with some divs to show info about something, Example Info about tasks available for each    category/collection
          */}
          {props.lista.map((info, i) => {
            if (i == 3) return <Button label={"+" + (props.lista.length - i)} type="button" />;

            if (i > 3) return undefined;

            return <Card key={i} type="TaskChart" collection={info.collection} category={info.category} registers={info.registers} keyIndex={i} />;
          })}
        </div>
      ) : (
        <>Lista Vacia</>
      )}
    </>
  );
}
