import { ObjectId } from 'mongoose'

export interface Snippet {
    _id: ObjectId;
    author: string;
    title: string;
    summary: string;
    text: string;
    createdAt: string;
  }