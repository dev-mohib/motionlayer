import { createSlice } from "@reduxjs/toolkit";
import { getPokemon } from "../actions/counter_actions";

interface Counter {
  id: number;
  value: number;
}

export type CounterState = {
  counters : Counter[]
};

const initialState: CounterState = {
  counters : [{id : 123, value : 5678}]
};

export const counterSlice = createSlice({
    name : "counter",
    initialState,
    reducers : {
        increament : (state) => {
            state.counters.push({id : Date.now(), value : Date.now()})
        },
        decreament : (state) => {
            state.counters.pop()
        }
    },
    extraReducers : (builder) => {
      builder.addCase(getPokemon.pending, (state) => {
        // update UI to pending
      })
      .addCase(getPokemon.fulfilled, (state) => {
        // Update fulfilled UI
      })
    }
});