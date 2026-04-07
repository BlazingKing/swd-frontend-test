export interface Person {
  id: string;
  titlename: "mr" | "mrs" | "ms";
  firstname: string;
  lastname: string;
  fullname: string;
  birthday: string;
  nationality: string;
  citizenId: string;
  gender: "Male" | "Female" | "Unsex";
  mobilePrefix: string;
  mobile: string;
  passportno?: string;
  expectedsalary: number;
}

export type PersonFormValues = Omit<Person, "id" | "fullname">;
