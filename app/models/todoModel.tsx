import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema(
  {
    title: String,
    description: String
  },
  {
    timestamps: true
  }
)

const Todos = mongoose.models.todos || mongoose.model('todos', todoSchema);
export default Todos;