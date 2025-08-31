import mongoose, { Schema, InferSchemaType } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    syllabus: { type: String },
    schedule: {
      startDate: { type: Date },
      endDate: { type: Date },
      days: [{ type: String }],
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export type Course = InferSchemaType<typeof CourseSchema> & { _id: mongoose.Types.ObjectId };

export const CourseModel = mongoose.models.Course || mongoose.model("Course", CourseSchema);
