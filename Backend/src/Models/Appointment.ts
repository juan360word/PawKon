
import mongoose from "mongoose";
import { Document,Schema } from "mongoose";

export interface TypeMent extends Document {
    user:Schema.Types.ObjectId,
    namePet:string,
    date:Date,
    description:string,
    status:string

}



const MentSchema : Schema = new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        unique:true,
        index:true,
        trim:true,
        required:true,
        ref:'User'
    },
    namePet:{
        type:String,
        trim:true,
        required:true
    },
     date:{
        type:Date,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        enum:['pending','confirmed','completed'],
        default:'pending',
        required:true
    }
},{timestamps:true})

const Ment = mongoose.model<TypeMent>('Ment',MentSchema)
export default Ment




