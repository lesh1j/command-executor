import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/commant.executor.js";
import { Ilogger } from "../../core/handlers/logger.inerface";
import { FileService } from "../../core/files/file.service.js";
import { PromptServise } from "../../core/prompt/prompt.service.js";
import { PromptTypes } from "../../core/prompt/prompt.types.js";
import { FfmpegBuilder } from "./ffmpeg.bulder.js";
import { ICommandFfmpeg, IFfmpegInput } from "./ffmpeg.types.";
import { StramHandler } from "../../core/handlers/stream.handler.js";

export class FffmpegExecutor extends CommandExecutor<IFfmpegInput> {
   private fileService: FileService = new FileService();
   private promptService: PromptServise = new PromptServise();
   private ffmpegBuilder: FfmpegBuilder = new FfmpegBuilder();

   constructor(logger: Ilogger) {
      super(logger);
      ss;
   }

   protected async prompt(): Promise<IFfmpegInput> {
      const width = await this.promptService.input<number>(
         "Width",
         PromptTypes.NUMBER
      );
      const height = await this.promptService.input<number>(
         "Height",
         PromptTypes.NUMBER
      );
      const path = await this.promptService.input<string>(
         "Path",
         PromptTypes.INPUT
      );
      const name = await this.promptService.input<string>(
         "Name",
         PromptTypes.INPUT
      );

      return { width, height, path, name };
   }

   protected build({
      width,
      height,
      path,
      name,
   }: IFfmpegInput): ICommandFfmpeg {
      const output = this.fileService.getFilePatch(path, name, "mp4");

      const args = this.ffmpegBuilder
         .seInput(path)
         .setSize(width, height)
         .setOutput(output)
         .build();

      return { command: "ffmpeg", args, output };
   }

   protected spawn({
      command,
      args,
      output,
   }: ICommandFfmpeg): ChildProcessWithoutNullStreams {
      this.fileService.deleteFileIfExist(output);

      return spawn(command, args);
   }

   protected processStream(
      stream: ChildProcessWithoutNullStreams,
      logger: Ilogger
   ): void {
      const handler = new StramHandler(logger);
      handler.processOutput(stream);
   }
}
