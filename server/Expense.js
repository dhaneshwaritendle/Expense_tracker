import prisma from "./src/db.js";

class Expense {
  static async create(title, amount, category, date, userId) {
    console.log(title, amount, category, date, userId)
    return await prisma.expense.create({
      data: {
        title,
        amount: Number(amount),
        category,
        date: new Date(date),
        userId: Number(userId)
      }
    });
  }

  static async findAll() {
    return await prisma.expense.findMany({
      orderBy: {
        date: "desc",
      },
    });
  }
  static async findById(id) {
    return await prisma.expense.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  static async update(id, data) {
    return prisma.expense.update({
      where:{
        id:Number(id)
      },
      data
    });
  }
  static async delete(id){
    const findid = await prisma.expense.delete({
      where: {id:Number(id)}
    });
    if(!findid) {return null;}
  
    return prisma.expense.delete({
      where:{
        id:Number(id)
      }
    });
  }
}


export default Expense;