import {createClient} from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

// Middleware to verify JWT token on protected routes
export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const {data: {user}, error} = await supabase.auth.getUser(token);


    if(error || !user ){
      console.error("supabase verification failed:" , error?.message || "No user found");
      return res.status(403).json({error: "Invalid or expired token"});
    }

    await prisma.user.upsert({
      where : {id:user.id},
      update: {},
      create: {
        id:user.id,
        username:user.email.split('@')[0],
      } 
    })

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ error: "Internal server authentication error" });
  }
}
