export interface ListFieldElement<T = unknown> {
  description: string;
  title: string;
  value: T;
  initials?: string;
  photo?: string;
  subtitle?: string;
  compareTo(value: T): boolean;
  hasCoincidence(pattern: string): boolean;
}
