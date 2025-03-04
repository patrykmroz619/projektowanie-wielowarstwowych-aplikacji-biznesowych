import { currentUser } from "@clerk/nextjs/server";

export const getUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.fullName,
  };
};
