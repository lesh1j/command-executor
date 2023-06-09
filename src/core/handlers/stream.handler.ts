import { ChildProcessWithoutNullStreams } from "child_process";
import { Ilogger } from "./logger.inerface";

export class StramHandler {
  logger: Ilogger;

  constructor(logger: Ilogger) {
    this.logger = logger;
  }

  processOutput(stream: ChildProcessWithoutNullStreams) {
    stream.stdout.on("data", (data) => {
      this.logger.log(data.toString());
    });

    stream.stderr.on("data", (data) => {
      this.logger.error(data.toString());
    });

    stream.on("close", () => {
      this.logger.end();
    });
  }
}
