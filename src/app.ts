import { FffmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor.js";
import { ConsoleLogger } from "./out/consoleLogger/consoleLogger.js";

export class App {
  async run() {
    new FffmpegExecutor(ConsoleLogger.getInstance()).execute()
  }
}

const app = new App();
app.run();
