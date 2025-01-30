import { ObjectId } from 'mongoose'

export interface Snippet {
    id: ObjectId;
    author: string;
    title: string;
    summary: string;
    text: string;
    createdAt: string;
  }