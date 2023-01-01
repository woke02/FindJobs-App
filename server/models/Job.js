import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        requred: [true, 'Please provide postion'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['Interview', 'Declined', 'Pending'],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Remote', 'Internship'],
        default: 'Full-time',
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide User']
    },
},
    { timestamps: true }
)

export default mongoose.model('Job', JobSchema)