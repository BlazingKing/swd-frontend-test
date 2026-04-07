import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPersons } from "@/store/slices/personSlice";
import { Person } from "@/types/person.types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const STORAGE_KEY = "persons";

export function usePersist() {
  const dispatch = useDispatch();
  const persons = useSelector((state: RootState) => state.person.persons);

  // load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch(setPersons(JSON.parse(raw) as Person[]));
    } catch {
      // ignore corrupted data
    }
  }, [dispatch]);

  // save on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
  }, [persons]);
}
