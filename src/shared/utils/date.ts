import { format } from "date-fns";
export interface FormartDate {
  date: string;
  time: string;
  month: string;
  year: string;
}

export const formatDateFallback = {
  date: "--/--/----",
  time: "--:--:--",
  month: "--",
  year: "----",
};

export const formatDate = (date?: Date | null | string): FormartDate => {
  if (!date) return formatDateFallback;

  let dateValid: Date;

  if (typeof date === "string") {
    dateValid = new Date(date);
  } else {
    dateValid = date;
  }

  const dateFormatted = format(dateValid, "dd/MM/yyyy");

  const timeFormatted = dateValid.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const month = dateValid.toLocaleDateString("es-ES", {
    month: "long",
  });

  const year = dateValid.toLocaleDateString("es-ES", {
    year: "numeric",
  });

  return {
    date: dateFormatted,
    time: timeFormatted,
    month,
    year,
  };
};

export const getTime = (date: string | Date) => {
  const fDate = formatDate(date);
  return fDate.time;
};
