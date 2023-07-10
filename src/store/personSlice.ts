import { createSlice } from "@reduxjs/toolkit";

export type Person = {
  id: number;
  name: string;
  country: string;
};

const initialValue: Person[] = [
  { id: 1, name: "Micheal", country: "USA" },
  { id: 2, name: "Dwight", country: "USA" },
  { id: 3, name: "Jim", country: "USA" },
  { id: 4, name: "Pam", country: "USA" },
  { id: 5, name: "Kevin", country: "USA" },
  { id: 6, name: "Creed", country: "USA" },
  { id: 7, name: "Robin", country: "Canada" },
  { id: 8, name: "Cartman", country: "Canada" },
  { id: 9, name: "Stan", country: "Canada" },
  { id: 10, name: "Fry", country: "UK" },
  { id: 11, name: "Amy", country: "UK" },
  { id: 12, name: "Leela", country: "UK" },
];

export const personSlice = createSlice({
  name: "person",
  initialState: {
    value: initialValue,
  },
  reducers: {
    addPerson: (state, action: { payload: Person }) => {
      state.value = [...state.value, action.payload];
    },
    editPerson: (state, action: { payload: Person }) => {
      state.value = state.value.map((person) => {
        if (person.id == action.payload.id) return action.payload;
        return person;
      });
    },
    deletePerson: (state, action: { payload: { id: number } }) => {
      state.value = state.value.filter(
        (person) => person.id != action.payload.id
      );
    },
  },
});

export const { addPerson, editPerson, deletePerson } = personSlice.actions;

export default personSlice.reducer;

export const selectPerson = (state: { person: { value: Person[] } }) =>
  state.person.value;
