import express from 'express';
import Post from '../models/post.model.js';
import slugify from 'slugify';
import { createPost, deleteBySlug, getAllPost, getPostBySlug, getPostByUser, updateBySlug } from '../controllers/post.controller.js';
import { verifyToken } from '../middleware.js';
import userRouter from './userRouter.js';

const router = express.Router();

router.use("/auth", userRouter)

// Public Routes

router.get('/posts', getAllPost);

router.get('/posts/:slug', getPostBySlug);

// Authenticated User Routes

router.get('/user/posts', verifyToken, getPostByUser);

router.post('/posts/create', verifyToken, createPost);

router.put('/posts/:slug',verifyToken, updateBySlug);

router.delete('/posts/:slug', verifyToken, deleteBySlug);

export default router;
