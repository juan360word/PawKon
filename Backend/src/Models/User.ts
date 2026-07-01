


import mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt'

export interface TypeUser extends Document {
    name:string,
    password:string,
    mail:string,
    role: 'User' | 'Doctor',
    comparePassword(password: string): Promise<boolean>
}


const SchemaUser : Schema = new Schema<TypeUser> ({
    name:{
        type:String,
        required: true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    mail:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    role:{
        type:String,
        enum:['User','Doctor'],
        default:'User'
    }

},{timestamps:true})

SchemaUser.pre("save", async function (this: TypeUser) {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

SchemaUser.methods.comparePassword = async function (this: TypeUser, candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<TypeUser>('User',SchemaUser)
export default User


