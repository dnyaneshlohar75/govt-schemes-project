import fs from 'fs'
import { execSync } from 'child_process';

exports.transcribe = async (filePath: string) => {
  const command = `whisper ${filePath} --language Marathi --model base --fp16 False --output_format txt`;

  execSync(command);

  const outputFile = filePath.replace(/\.[^/.]+$/, "") + ".txt";
  const text = fs.readFileSync(outputFile, 'utf-8');
  return text.trim();
};
