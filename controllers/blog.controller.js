let posts = [];
let nextId = 1;

function getAllPosts(req, res) {
  return res.status(200).json({ success: true, count: posts.length, data: posts });
}

function getPostById(req, res) {
  const id = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }
  return res.status(200).json({ success: true, data: post });
}

function createPost(req, res) {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content are required fields" });
  }
  const newPost = {
    id: nextId++,
    title,
    content,
    author: author || "Anonymous",
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return res.status(201).json({ success: true, message: "Post created successfully", data: newPost });
}

function updatePost(req, res) {
  const id = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }
  const { title, content, author } = req.body;
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (author !== undefined) post.author = author;
  post.updatedAt = new Date().toISOString();
  return res.status(200).json({ success: true, message: "Post updated successfully", data: post });
}

function deletePost(req, res) {
  const id = parseInt(req.params.id, 10);
  const initialLength = posts.length;
  posts = posts.filter((p) => p.id !== id);
  if (posts.length === initialLength) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }
  return res.status(200).json({ success: true, message: `Post ${id} deleted successfully` });
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };