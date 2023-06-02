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
