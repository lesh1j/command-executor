import { ChildProcessWithoutNullStreams } from "child_process";
import { Ilogger } from "../handlers/logger.inerface";
import { ICommand } from "./commant.types";

export abstract class CommandExecutor<Input> {
  logger: Ilogger;

  constructor(logger: Ilogger) {
    this.logger = logger;
  }

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processStream(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommand;
  protected abstract spawn(command: ICommand): ChildProcessWithoutNullStreams;
  protected abstract processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: Ilogger
  ): void;
}
