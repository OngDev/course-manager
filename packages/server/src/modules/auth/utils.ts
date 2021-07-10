import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';

export async function hashPassword(rawPass: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(rawPass, salt);
}

export async function isMatch(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateNewPassword(): string {
  return generate({
    length: 10,
    numbers: true,
    symbols: true,
  });
}
