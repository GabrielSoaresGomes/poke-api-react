import React, {useState} from "react";
import axios from 'axios'

import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState("charmander")
  const [dadosPokemon, setDadosPokemon] = useState([])
  const [tipoPokemon, setTipoPokemon] = useState("")
  const [encontrado, setEncontrado] = useState(false)
  const [spritePoke, setSpritePoke] = useState()

  const getPoke = async() => {
    const pokeArray = []
    try{
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const response = await axios.get(url)
      pokeArray.push(response.data)
      setTipoPokemon(response.data.types[0].type.name)
      setDadosPokemon(pokeArray)
      setEncontrado(true)
    }catch(error) {
      setEncontrado(false)
      return
    }
  }

  const buscarPoke = (e) => {
    e.preventDefault()
    getPoke()
  }

  const changePokemon = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  return (
    <div className="app">
      <form onSubmit={buscarPoke}>
        <label></label>
        <input type="text" placeholder="Insira um pokemon..." onChange={changePokemon} />
      </form>
      {dadosPokemon.map((dados) => {
        return (
          <div key={dados.id} className="container"> 
            {encontrado && (
              <div className="dados">
                <img src={dados.sprites.front_default} name="img-default" alt={`Imagem do ${pokemon}`} />
                <img src={dados.sprites.front_shiny} name="img-shiny" alt={`Imagem Shiny do ${pokemon}`} />
                <table className="table">                
                  <tbody>
                  <tr>
                      <td>ID: </td>
                      <td>{dados.id}</td>
                    </tr>
                    <tr>
                      <td>Tipo: </td>
                      <td>{tipoPokemon}</td>
                    </tr>
                    <tr>
                      <td>Altura: </td>
                      <td>{(dados.height/10 ).toFixed(2)}m</td>
                    </tr>
                    <tr>
                      <td>Peso: </td>
                      <td>{(dados.weight/10).toFixed(2)}KG</td>
                    </tr>
                    <tr>
                      <td>Número de batalha: </td>
                      <td>{dados.game_indices.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>)}             
          </div> 
        )
      })}
      {!encontrado && (<h2>Não foi possível encontrar um resultado! </h2>)}
    </div>
  );
}

export default App;
