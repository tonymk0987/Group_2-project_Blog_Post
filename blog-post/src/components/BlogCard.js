import React, { useState } from 'react';
import axios from 'axios';
import './img.css';
import BlogModal from './BlogModal';

const truncateText = (text, length) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

const BlogCard = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleOpenModal = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  const deleteBlogPost = async (blog) => {
    try {
      const response = await axios.delete(`http://localhost:8002/posts/${blog.id}`);
      console.log(response.data);
      // Reload the page to reflect the deleted blog post
      window.location.reload();
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-post">
          <h3>{blog.title}</h3>
          {blog.image && (
            <img className="blog-image" src={blog.image} alt={blog.title} />
          )}
          <p>
            {truncateText(blog.body, 100)}{' '}
            <button onClick={() => handleOpenModal(blog)}>Read More</button>
          </p>
          <p>{blog.category}</p>
          <p>{blog.author}</p>
          <button onClick={() => deleteBlogPost(blog)}>Delete post</button>
        </div>
      ))}
      <BlogModal
        blog={selectedBlog}
        isVisible={Boolean(selectedBlog)}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default BlogCard;
