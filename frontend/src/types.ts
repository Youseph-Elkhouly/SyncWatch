export type VideoControlAction = "PLAY" | "PAUSE" | "SYNC";

export interface ControlMessage {
  type: "CONTROL_VIDEO";
  action: VideoControlAction;
  timestamp?: number;
}
