import mongoose from "mongoose";
import { Document, Schema } from "mongoose";


export interface AdoptionType extends Document {
    user: mongoose.Types.ObjectId,
    breedName: string,
    breedImageUrl: string,
    message: string,
    status: string,
}


const AdoptionSchema: Schema = new Schema<AdoptionType>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },
    breedName: {
        type: String,
        trim: true,
        required: true
    },
    breedImageUrl: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        required: true
    }
}, { timestamps: true })


const Adoption = mongoose.model<AdoptionType>('Adoption', AdoptionSchema)
export default Adoption
