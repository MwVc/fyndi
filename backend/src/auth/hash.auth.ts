import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  // hash password
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};
