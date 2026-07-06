import prisma from "./db.js";

class Expense {
  static async create(title, amount, category, date, userId) {
    console.log("Expense create",title, amount, category, date, userId)
    return await prisma.expense.create({
      data: {
        title,
        amount: Number(amount),
        category,
        date: new Date(date),
        userId: userId
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
    // Find the record first to ensure it exists before deleting.
    const expenseToDelete = await prisma.expense.findUnique({
      where: {id:Number(id)}
    });
    if (!expenseToDelete) {
      return null; // Or throw an error
    }
    return await prisma.expense.delete({ where: { id: Number(id) } });
  }
  static async findByCategory(category){
    const data = await prisma.expense.groupBy({
      by : ['category'],
      where : {userId: req.userId},
      _sum : {amount:true} 
    });
  }
}


export default Expense;