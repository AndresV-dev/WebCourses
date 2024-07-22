export function error(json: string) {
  const jsonData = JSON.parse(json);

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

export function loggedOut() {
  return (
    <>
      <div className={``}>
        <p>You Has Been Logged Out Successfully</p>
      </div>
    </>
  );
}

export function welcome(json: string) {
  const jsonData = JSON.parse(json);
  return (
    <>
      <div>
        <p>
          Hi There, <b>{jsonData.username}</b>!
        </p>
        <p>
          Welcome to <b>Post It</b>
        </p>
      </div>
    </>
  );
}
