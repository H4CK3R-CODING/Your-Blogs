import Post from "../models/post.model.js";
import slugify from "slugify"

export const getAllPost = async (req, res) => {
  const posts = await Post.find()
    .populate("author", "username")
    .sort({ createdAt: -1 });
  res.json(posts);
};

export const getPostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "author",
    "username"
  );
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const getPostByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error,
    });
  }
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const slug = slugify(title, { lower: true, strict: true });

  try {
    const newPost = new Post({ title, content, slug, author: req.user.id });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
};

export const updateBySlug = async (req, res) => {
  const { title, content, slug: newSlug } = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { slug: req.params.slug, author: req.user.id },
      { title, content, slug: newSlug },
      { new: true }
    );
    if (!updatedPost)
      return res
        .status(403)
        .json({ message: "Not authorized or post not found" });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err });
  }
};

export const deleteBySlug = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      slug: req.params.slug,
      author: req.user.id,
    });
    if (!deletedPost)
      return res
        .status(403)
        .json({ message: "Not authorized or post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err });
  }
};
