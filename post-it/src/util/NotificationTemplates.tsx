export default function error(json: string, isVisible: boolean) {
  const jsonData = JSON.parse(json);

  console.log(isVisible);
  return (
    <>
      <div className={``}>
        <p>There is an error, code: {jsonData.code}</p>
        <p> {jsonData.type} </p>
        <p> {jsonData.message} </p>
      </div>
    </>
  );
}
