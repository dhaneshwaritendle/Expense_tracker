import prisma from "./src/db.js";
import bcrypt from "bcrypt";
class User {
  static async create(name, email, username, plainPassword) {
    try {
      const passwordHash = await bcrypt.hash(plainPassword, 10);

      return await prisma.user.create({
        data: {
          name,
          email,
          username,
          password_hash: passwordHash,
        },
      });
    } catch (error) {
      console.error("database error:", error.message);
    }
  }

  static async findByUsername(username) {
    // const sql = "SELECT * FROM users WHERE username = $1;";
    const data = await prisma.user.findUnique({
      where: {
        username: String(username),
      },
    });
    return data;
  }
}

export default User;
