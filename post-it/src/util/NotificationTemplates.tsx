export default function error(json: string) {
  const jsonData = JSON.parse(json);

  return (
    <>
      <div className="notiContainer showNotification">
        <p>There is an error, code: {jsonData.code}</p>
        <p> {jsonData.type} </p>
        <p> {jsonData.message} </p>
      </div>
    </>
  );
}
