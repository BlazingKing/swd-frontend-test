import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "@/types/person.types";

interface PersonState {
  persons: Person[];
  selectedIds: string[];
}

const initialState: PersonState = {
  persons: [],
  selectedIds: [],
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPersons(state, action: PayloadAction<Person[]>) {
      state.persons = action.payload;
    },
    addPerson(state, action: PayloadAction<Person>) {
      state.persons.push(action.payload);
    },
    editPerson(state, action: PayloadAction<Person>) {
      const idx = state.persons.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.persons[idx] = action.payload;
    },
    deletePerson(state, action: PayloadAction<string>) {
      state.persons = state.persons.filter((p) => p.id !== action.payload);
    },
    deleteMultiplePersons(state, action: PayloadAction<string[]>) {
      state.persons = state.persons.filter((p) => !action.payload.includes(p.id));
    },
    setSelectedIds(state, action: PayloadAction<string[]>) {
      state.selectedIds = action.payload;
    },
  },
});

export const { setPersons, addPerson, editPerson, deletePerson, deleteMultiplePersons, setSelectedIds } = personSlice.actions;

export default personSlice.reducer;
