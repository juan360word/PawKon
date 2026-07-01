

import mongoose from "mongoose";
import { Document,Schema, CallbackWithoutResultAndOptionalError } from "mongoose";


export interface AdoptionType extends Document {
    user:mongoose.Types.ObjectId,
    breedName:string,
    breedImageUrl:string,
    messaje:string,
    status:string,

}


const AdoptionSchema : Schema = new Schema<AdoptionType> ({
    user:{
        type:Schema.Types.ObjectId,
        require:true,
        index:true,
        ref:'User'
    },
    breedName:{
        type:String,
        trim:true,
        required:true
    },
    breedImageUrl:{
        type:String
    },
    messaje:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','aproved','rejected'],
        default:'pending',
        required:true
    }
},{timestamps:true})


const Adoption = mongoose.model<AdoptionType>('Adoption',AdoptionSchema)
export default Adoption


