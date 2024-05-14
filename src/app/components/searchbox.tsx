'use client'
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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Pet[]>([]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    try {
      const response = await axios.get<{ data: Pet[] }>(
        `https://nest-desafio-j1-artur.onrender.com/pets?q=${value}`
      );
      setResults(response.data); // Changed this line
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Procure aqui"
        value={query}
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
