import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPokemon = createAsyncThunk("pokemon/getPokemon", async () => {
    const response = await await fetch(
      "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
    );
    return await response.json();
  });

