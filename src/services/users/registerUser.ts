import PostgreDAO from "../../dao/postgre.dao.js";
import { UserAttributes, UserCreationAttributes } from "../../types/index.js";
import { EmailHandler } from "../../handlers/email.handler.js";
import { UserHelper } from "../../helpers/user.helper.js";
import MemoryStorage from "../../storage/memory.storage.js";

export async function registerUser(user: UserCreationAttributes) {
  try {
    const postgreDAOInstance = await PostgreDAO.getInstance();

    const existingUser = await postgreDAOInstance.getFromTable<UserAttributes>(
      "users",
      { email: user.email }
    );
    if (existingUser.length > 0) throw new Error("User already exists");

    const registeredUser = await postgreDAOInstance.insertIntoTable<UserCreationAttributes>(
      "users",
      user
    );
    if (!registeredUser) throw new Error("Unable to register user");

    if (!user.active) {
      const verificationCode = UserHelper.createCode();
      MemoryStorage.addVerificationCode(user.email, verificationCode);
      const emailSent = await EmailHandler.sendVerificationEmail(
        user.email,
        user.fullname,
        verificationCode
      )
      if (!emailSent) throw new Error("User registration successful, but unable to send verification email");
    }

    return { ...registeredUser[0], password: null } as UserAttributes
  } catch (err) {
    throw err;
  }
}