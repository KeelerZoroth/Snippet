import { Schema, model, Document } from 'mongoose';

// Define an interface for the Snippet document
interface ISnippet extends Document {
  text: string;
  title: string;
  summary: string;
  author: string;
  createdAt: Date;
}

// Define the schema for the Snippet document
const SnippetSchema = new Schema<ISnippet>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true
    },
    summary: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Snippet = model<ISnippet>('Snippet', SnippetSchema);

export default Snippet;
