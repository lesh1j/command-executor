import { ICommand } from "../../core/executor/commant.types";

export interface IFfmpegInput {
  width: number;
  height: number;
  path: string;
  name: string;
}

export interface ICommandFfmpeg extends ICommand {
  output: string;
}
