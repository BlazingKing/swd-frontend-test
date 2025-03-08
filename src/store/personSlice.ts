import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Person {
  id: string;
  titlename: string;
  firstname: string;
  lastname: string;
  fullname: string;
  birthday: Date;
  nationality: string;
  citizenid: string;
  gender: string;
  phone: string;
  passportno: string;
  expectedsalary: number;
}

interface PersonState {
  persons: Person[];
  selectedIds: string[];
}

const loadFromLocalStorage = (): Person[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("persons");
    return data ? JSON.parse(data) : [];
  }
  return [];
};


const saveToLocalStorage = (persons: Person[]) => {
  localStorage.setItem("persons", JSON.stringify(persons));
};

const initialState: PersonState = { persons: loadFromLocalStorage(), selectedIds: [] };

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.persons.push(action.payload);
      saveToLocalStorage(state.persons);
    },
    editPerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
        saveToLocalStorage(state.persons);
      }
    },
    deletePerson: (state, action: PayloadAction<string>) => {
      state.persons = state.persons.filter((p) => p.id !== action.payload);
      saveToLocalStorage(state.persons);
    },

    deleteMultiplePersons: (state, action: PayloadAction<string[]>) => {
      state.persons = state.persons.filter(
        (p) => !action.payload.includes(p.id)
      );
      saveToLocalStorage(state.persons);
    },

    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
  },
});

export const { addPerson, editPerson, deletePerson, deleteMultiplePersons , setSelectedIds } =
  personSlice.actions;
export default personSlice.reducer;
