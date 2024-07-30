import { spawn } from "child_process";
export default function python(body: any, resolve: any, reject: any) {
  try {
    const a = body.buffer;
    const child = spawn("python3", ["py.py"]);
    const dataToSend = a.join(",");
    child.stdin.write(dataToSend);
    child.stdin.end();
    let outputData: any;
    child.stdout.on("data", (data) => {
      const lines = data.toString().split("\n");
      lines.forEach((line: any) => {
        if (line.includes("True")) {
          outputData = true;
        } else if (line.includes("False")) {
          outputData = false;
        }
      });
    });
    child.stderr.on("data", (data) => {
      outputData = data.toString();
    });
    child.on("close", (code) => {
      resolve(outputData);
    });
  } catch {
    console.error("error");
    reject("error");
  }
}
