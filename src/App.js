import React, {useEffect, useState} from "react";
import axios from 'axios'

const App = () => {
  const [pokemon, setPokemon] = useState("charmander")
  const [dadosPokemon, setDadosPokemon] = useState([])
  const [tipoPokemon, setTipoPokemon] = useState("")
  const [encontrado, setEncontrado] = useState(false)

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
    <div className="App">
      <form onSubmit={buscarPoke}>
        <label></label>
        <input type="text" placeholder="Insira um pokemon" onChange={changePokemon} />
      </form>
      {dadosPokemon.map((dados) => {
        return (
          <div className="container"> 
            {encontrado && (
              <table className="table">
                <thead><img src={dados.sprites.front_default} alt={`Imagem do ${pokemon}`} /></thead>
                <tbody>
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
              </table>)}
              {!encontrado && <h1>Não foi possível encontrar um resultado para {pokemon} </h1>}
             
          </div> 
        )
      })}
    </div>
  );
}

export default App;
