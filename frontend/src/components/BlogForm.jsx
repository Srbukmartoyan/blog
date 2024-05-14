import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import InputField from './InputField';
import { Button } from './Button';
import upload_area from '../assets/upload_area.svg';

const BlogForm = ({ blogId }) => {


  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [prevImg, setPrevImg] = useState(false);
  const [categories, setCategories] = useState([]);
  const [blogPost, setBlogPost] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    selectedCategory: '',
    image: '',
  });

  const { data: categoriesData, error: categoriesError } = useSWR('/hashtags', fetchCategories);

  const { data: blogPostData, error: blogPostError } = useSWR(blogId ? `/posts/${blogId}` : null);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (blogPostData) {
      setBlogPost(blogPostData);
      setFormData({
        title: blogPostData.title,
        author: blogPostData.Author?.name,
        content: blogPostData.content,
        selectedCategory: blogPostData.Hashtags,
        image: blogPostData.image,
      });
      if (blogPostData.Image) {
        setPrevImg(blogPostData.Image.url);
      }
    }
  }, [blogPostData]);

  const getOptions = () => {
    const { data, error } = useSWR('/hashtags', getOptions);
  
    return {
      options: data,
      isLoading: !error && !data,
      isError: error,
    };
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setPrevImg(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePostResponse = (data, successMessage, failureMessage) => {
    if (data.success) {
      alert(successMessage);
      navigate('/');
    } else {
      alert(failureMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = formData;
    form.excerpt = form.content.substring(0, 100);
    let responseData = { success: true };

    if (image) {
      let imgFormData = new FormData();
      imgFormData.append('post-img', image);
      await fetch('/upload', { //saving here image with new path - geting from back
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: imgFormData,
      }).then((resp) => resp.json()).then((data) => responseData = data);
    }

    if (responseData.success) {
      form.image = responseData?.image_url;
      try {
        const url = blogPost ? `/posts/${blogPost.id}` : '/posts';
        const resp = await fetch(url, {
          method: blogPost ? 'PUT' : 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        const data = await resp.json();
        handlePostResponse(data, blogPost ? 'Post Updated' : 'Post Added', blogPost ? 'Failed to update post' : 'Failed to add post');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className="mt-8 w-2/5 mx-auto border-2 p-3 rounded bg-zinc-50">
      <InputField
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <InputField
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
      />
      <InputField
        type="textarea"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Content"
      />
      <AsyncSelect
        className="mt-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
        name="selectedCategory"
        loadOptions={getOptions}
        isMulti
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id}
        onChange={(selectedOptions) => {
          const selectedCategories = selectedOptions.map(option => option.name);
          setFormData({ ...formData, selectedCategory: selectedCategories });
        }}

        defaultOptions={Array.isArray(formData.selectedCategory) ?
          formData.selectedCategory.map(category => ({ name: category.name, id: category.id })) :
          null
        }
      />
      <label htmlFor="file-input">
        {prevImg ? (
          <img src={prevImg} alt="" className='mt-2.5 w-32 h-32 rounded-lg object-contain' />
        ) : (
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='mt-2.5 w-32 h-32 rounded-lg object-contain' />
        )}
      </label>
      <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      <Button text={blogPost ? 'Save Changes' : 'Create Blog'} type='submit' />
    </form>
  );
}

export default BlogForm;
