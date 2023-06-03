export interface PanelCommand {
  id: string;
  command: string;
  intensity: number;
  receivedAt?: string;
}

export interface DroneCommand {
  leftRight: number;
  frontBack: number;
  upDown: number;
}

export interface ControlButton {
  label: string;
  command: string;
  color?: string;
}

export interface Controls {
  left?: ControlButton;
  right?: ControlButton;
  top?: ControlButton;
  down?: ControlButton;
  center?: ControlButton;
}