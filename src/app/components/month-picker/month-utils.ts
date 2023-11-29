import { MONTHS_NAME } from '@xofttion/utils';

export interface MonthModel {
  value: number;
  label: string;
}

export function monthFactory(value: number): MonthModel {
  return { value, label: MONTHS_NAME[value] };
}

export const MONTHS: Array<MonthModel> = [
  monthFactory(0),
  monthFactory(1),
  monthFactory(2),
  monthFactory(3),
  monthFactory(4),
  monthFactory(5),
  monthFactory(6),
  monthFactory(7),
  monthFactory(8),
  monthFactory(9),
  monthFactory(10),
  monthFactory(11)
];
