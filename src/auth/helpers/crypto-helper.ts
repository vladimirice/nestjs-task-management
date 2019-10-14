import * as bcrypt from 'bcryptjs';

async function generateSalt(): Promise<string> {
  return bcrypt.genSalt();
}

async function hashString(data: string, salt: string): Promise<string> {
  return bcrypt.hash(data, salt);
}

export const compareStringHashes = async (
  actualData: string, salt: string, expectedHash: string,
): Promise<boolean> => {
  const actualHash = await hashString(actualData, salt);

  return actualHash === expectedHash;
};

export const hashStringWithSalt = async (data: string): Promise<{ salt: string, hash: string }> => {
  const salt = await generateSalt();
  const hash = await hashString(data, salt);

  return {
    salt,
    hash,
  };
};
