'use client'
import React, { useState, useEffect, useCallback } from "react";
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
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  const handleSearch = useCallback(async (value: string) => {
    try {
      const response = await axios.get<{ data: Pet[] }>(
        `https://nest-desafio-j1-artur.onrender.com/pets?q=${value}`
      );
      setResults(response.data.data); // Access the 'data' property of 'response.data'
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    if (debouncedInput) {
      handleSearch(debouncedInput);
    }
  }, [debouncedInput, handleSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Procure aqui"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
