import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPass: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(rawPass, salt);
  return hash;
}

export async function isMatch(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
