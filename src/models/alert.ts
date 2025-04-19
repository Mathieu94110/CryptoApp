export const SET_ALERT = "SET_ALERT";
export const SET_ALERT_SUCCESS = "SET_ALERT_SUCCESS";

export interface AlertAction {
  type: typeof SET_ALERT | typeof SET_ALERT_SUCCESS;
  payload: string;
}

export interface AlertState {
  message: string;
}

export interface AlertProps {
  message: string;
  onClose: () => void;
}
