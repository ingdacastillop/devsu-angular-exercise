export interface PopupAction {
  label: string;
  onClick?: () => void;
}

export interface PopupConfig {
  message: string;
  title?: string;
  subtitle?: string;
  approved?: PopupAction;
  reject?: PopupAction;
  theme?: string;
}
