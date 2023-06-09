import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";

export class FileService {
  public getFilePatch(path: string, name: string, ext: string): string {
    if (!isAbsolute) {
      path = join(__dirname + "/" + path);
    }

    return join(dirname(path) + "/" + name + "." + ext);
  }

  public async deleteFileIfExist(path: string) {
    if (await this.isExist(path)) {
      promises.unlink(path);
    }
  }

  private async isExist(path: string): Promise<boolean> {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }
}
