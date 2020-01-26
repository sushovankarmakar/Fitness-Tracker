//defining here, how exercise should look like

export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date; // ? means optional
  state?: "completed" | "cancelled" | null;
}
