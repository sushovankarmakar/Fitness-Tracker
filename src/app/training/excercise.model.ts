//defining here, how excercise should look like

export interface Excercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date; // ? means optional
  state?: "completed" | "cancelled" | null;
}
