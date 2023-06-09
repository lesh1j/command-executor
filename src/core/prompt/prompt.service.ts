import inquirer from "inquirer";
import { PromptTypes } from "./prompt.types.js";

export class PromptServise {
  public async input<T>(message: string, type: PromptTypes) {
    const { result } = await inquirer.prompt<{ result: T }>([
      {
        type,
        name: "result",
        message,
      },
    ]);

    return result;
  }
}