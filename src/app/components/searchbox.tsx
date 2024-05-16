import React, { useState } from "react";
import axios from "axios";

interface Pet {
  id: string;
  nome: string;
  nascimento: string;
  animal: string;
  raca: string;
  donoId: string;
}

function SearchBox() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Pet[]>([]);

  const handleSearch = async (value: string) => {
    setInput(value);
    try {
      console.log(`Searching for: ${value}`); // Log de depuração
      const response = await axios.get<Pet[]>(
        `https://nest-desafio-j1-artur.onrender.com/pets/search?q=${value}`
      );
      console.log('Response:', response); // Log de depuração
      setResults(response.data); // Não é necessário acessar 'data.data' porque o backend já retorna a lista de pets diretamente
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Procure aqui"
        value={input}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.nome} - {result.animal}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBox;
