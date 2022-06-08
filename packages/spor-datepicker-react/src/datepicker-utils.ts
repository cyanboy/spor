import { useMonth, UseMonthProps } from "@datepicker-react/hooks";

export interface Day {
  dayLabel: string;
  date: Date;
}

const isDay = (day: number | Day): day is Day => typeof day !== "number";

const getWeekdayIndexOfFirst = (
  days: (number | { dayLabel: string; date: Date })[]
) => days.filter((day) => !isDay(day)).length;

export const usePrevDays = (
  { year, month, firstDayOfWeek, dayLabelFormat }: UseMonthProps,
  days: (number | { dayLabel: string; date: Date })[]
) => {
  const { days: prevMonth } = useMonth({
    year,
    month: month - 1,
    firstDayOfWeek,
    dayLabelFormat,
  });
  const weekdayOfFirst = getWeekdayIndexOfFirst(days);
  return weekdayOfFirst
    ? prevMonth.filter(isDay).slice(-1 * weekdayOfFirst)
    : [];
};

export const useNextDays = ({
  year,
  month,
  firstDayOfWeek,
  dayLabelFormat,
}: UseMonthProps) => {
  const { days: nextMonth } = useMonth({
    year,
    month: month + 1,
    firstDayOfWeek,
    dayLabelFormat,
  });
  const weekdayOfFirstInNext = getWeekdayIndexOfFirst(nextMonth);
  return nextMonth.filter(isDay).slice(0, 7 - (weekdayOfFirstInNext || 7));
};

export const dayLabelFormat = (date: Date): string => date.getDate().toString();
