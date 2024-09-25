import { useEffect, useState,useRef } from "react";
import "./style.css";
import Trash from "../../assets/16qg.svg";
import api from "../../services/api"
function Home() {
  const [users, setUsers] = useState([])

  async function getUsers(){
    const userFromApi = await api.get('/usuarios')
    setUsers(userFromApi.data)
    return users
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  async function createUsers(){
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });
      // Recarregar a página após a criação do usuário
      getUsers()
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
    }
  }



  useEffect(() => {
    getUsers()
  }, [] )

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de usuário</h1>
        <input  placeholder="Nome:" type="text" name="name" ref={inputName}/>
        <input  placeholder="Idade:" type="text" name="age" ref={inputAge}/>
        <input  placeholder="Email:" type="text" name="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((itens) => {
        return (
          <div key={itens.id} className="dados">
            <div>
              <p>Nome: <span> {itens.name}</span></p>
              <p>Idade: <span>{itens.age}</span></p>
              <p>Email: <span>{itens.email}</span></p>
            </div>
            <button onClick={() => deleteUsers(itens.id)}>
              <img src={Trash} alt="Excluir" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
