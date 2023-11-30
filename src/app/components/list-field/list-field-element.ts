export interface ListFieldElement<T = unknown> {
  description: string;
  title: string;
  value: T;
  compareTo(value: T): boolean;
  hasCoincidence(pattern: string): boolean;
}
