export interface DayPickerStatus {
  disabled: boolean;
}

interface DayModelStatus {
  forbidden: boolean;
  disabled: boolean;
}

export interface DayModel {
  value?: number;
  status: DayModelStatus;
}

export interface WeekModel {
  days: Array<DayModel>;
}

export function dayFactory(
  value?: number,
  disabled = false,
  forbidden = false
): DayModel {
  return {
    value,
    status: {
      disabled,
      forbidden
    }
  };
}
