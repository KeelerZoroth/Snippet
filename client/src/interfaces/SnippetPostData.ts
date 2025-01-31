import { ObjectId } from 'mongoose'

export interface SnippetPostData {
    _id: ObjectId;
    text: string;
    title: string;
    summary: string;
    language: string;
    author: string;
    createdAt: string;
}