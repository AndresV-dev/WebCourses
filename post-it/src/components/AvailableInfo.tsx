import { useState } from "react";
import { AvailableInfoType, UserTaskCollections } from "../types";
import Button from "./Button";
import Card from "./Card";

interface AvailableInfoProps {
  lista: Array<AvailableInfoType>;
}

export default function AvailableInfo(props: AvailableInfoProps) {
  const [collections] = useState<Array<UserTaskCollections>>(JSON.parse(sessionStorage.collections));

  return (
    <>
      {props.lista !== undefined && props.lista.length > 0 ? (
        <div className="chartsContainer">
          {/*
          Create a list with some divs to show info about something, Example Info about tasks available for each    category/collection
          */}
          {collections.map((col, i) => {
            if (i == 5) return <Button label={"+" + (collections.length - i)} type="button" />;

            if (i > 5) return undefined;
            return <Card key={i} type="TaskChart" collection={col} category={col.categories.length != 0 ? col.categories[0] : undefined} registers={props.lista.find((collection) => collection.collection === col.name)?.registers || 0} keyIndex={i} />;
          })}
        </div>
      ) : (
        <>Lista Vacia</>
      )}
    </>
  );
}
