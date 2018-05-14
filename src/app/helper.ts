export class Helper {

  convertToDate(input: string[]): string {
    return input[2] + "/" + input[1] + "/" + input[0];
  }

}
