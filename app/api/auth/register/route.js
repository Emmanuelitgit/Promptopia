import mongoose from "mongoose";
import User from "@models/user";
import { NextResponse } from "next/server";
import { connectToDB } from '@utils/database'
import bcrypt from "bcrypt";



export const POST = async(request)=>{
    try {

      const {email, username, password, image} = await request.json()

      const salt = bcrypt.genSaltSync(10)

      const hashedPassword = bcrypt.hashSync(password, salt)

      const newUser = await new User({
        email, 
        username,
        password:hashedPassword, 
        image
    });

      if(!newUser) return new NextResponse("Error creating user", {status:401});

      await connectToDB();

      await newUser.save();
      if(newUser) return new NextResponse("User has created", {status:201});

    } catch (error) {
        // if(error) return new NextResponse("Internal server error", {status:500});
        console.log(error)
    }
}