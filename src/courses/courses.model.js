import {Schema, model} from "mongoose";

const CoursesSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keeper: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamp: true,
    versionKey: false
});

export default model('Course', CoursesSchema);