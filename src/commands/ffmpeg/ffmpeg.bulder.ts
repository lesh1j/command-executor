export class FfmpegBuilder {
  private inputPath: string = "";
  private outputPath: string = "";
  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set("-c:v", "libx264");
  }

  seInput(path: string): this {
    this.inputPath = path;
    return this;
  }

  setSize(width: number, height: number) {
    this.options.set("-s", `${width}x${height}`);
    return this;
  }

  setOutput(path: string): this {
    this.outputPath = path;
    return this;
  }

  build(): string[] {
    if (!this.inputPath) {
      throw new Error("Option inputPath path is undefined");
    }

    const args = ["-i", this.inputPath];

    this.options.forEach((value, key) => {
      args.push(key);
      args.push(value);
    });

    if (!this.outputPath) {
      throw new Error("Option outputPath path is undefined");
    }

    args.push(this.outputPath);

    return args;
  }
}
