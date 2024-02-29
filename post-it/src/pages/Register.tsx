import Modal from "../components/Modal";

function Register() {
    return (
      <div className="register">
        <h1>Example of Modal Open</h1>
        <button>Open</button>
        <Modal content="createTask"/>
      </div>
    );
  }
  
  export default Register;