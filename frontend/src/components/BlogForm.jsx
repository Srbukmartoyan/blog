import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import useSWR, { mutate } from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authFetcher } from '../utils/fetcher';

import InputField from './InputField';
import { Button } from './Button';
import upload_area from '../assets/upload_area.svg';

const BlogForm = ({ blogPost }) => {
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(false);
  const [formData, setFormData] = useState({
    title: blogPost ? blogPost.title : '',
    content: blogPost ? blogPost.content : '',
    selectedCategory: blogPost ? blogPost.Hashtags.map(tag => ({ name: tag.name, id: tag.id })) : [],
    image: blogPost ? blogPost.Image : '',
  });

  const { data: hashtags, error } = useSWR('/hashtags', authFetcher);

  const imageHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setNewImage(true);
  }

  const deleteImage = () => {
    setFormData({ ...formData, image: '' });
    setNewImage(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePostResponse = (data, successMessage, failureMessage) => {
    if (data.success) {
      mutate(`/posts/${blogPost?.id}`);
      toast.success(successMessage, {
        onClose: () => navigate('/user/me'),
      });
    } else {
      toast.error(failureMessage, {
        onClose: () => navigate('/user/me'),
      });
    }
  };

  const uploadImage = async (image) => {
    const token = localStorage.getItem('auth-token');
    let responseData = { success: true };
    if (image && newImage) {
      let imgFormData = new FormData();
      imgFormData.append('post-img', image);
      await fetch('/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': token,
        },
        body: imgFormData,
      }).then((resp) => resp.json()).then((data) => responseData = data);
    }
    return responseData;
  };

  const savePost = async (form, token) => {
    const response = await fetch(blogPost ? `/posts/${blogPost.id}` : '/posts', {
      method: blogPost ? 'PUT' : 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    const successMessage = blogPost ? 'Post Updated' : 'Post Added';
    const failureMessage = blogPost ? 'Failed to update post' : 'Failed to add post';
    handlePostResponse(data, successMessage, failureMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth-token');
    let form = formData;
    form.excerpt = form.content.substring(0, 100);

    if (typeof (form.selectedCategory[0]) == 'object') {
      let newSelectedCategory = form.selectedCategory.map(el => el.name);
      form.selectedCategory = newSelectedCategory;
    }

    const responseData = await uploadImage(form.image);

    if (responseData.success && newImage) {
      form.image = responseData?.image_url;
    } else {
      form.image = formData.image?.url;
    }
    savePost(form, token);
  };

  if (!error && !hashtags) return <div className='mt-4 text-center'>Loading hashtags...</div>;
  if (error) return <div className='mt-4 text-center text-red-700 font-bold'>Error fetching data</div>;

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-3/4 sm:w-96 border-2 border-slate-300 p-4 rounded bg-zinc-50">
        <InputField
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <InputField
          type="textarea"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <Select
          className="mt-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
          name="selectedCategory"
          cacheOptions
          options={hashtags}
          isMulti
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          onChange={(selectedOptions) => {
            const selectedCategories = selectedOptions.map(option => option.name);
            setFormData({ ...formData, selectedCategory: selectedCategories });
          }}
          defaultValue={formData.selectedCategory}
        />
        <label htmlFor="file-input">
          {(formData.image && !newImage) ? (
            <img src={formData.image.url} alt="" className='mt-2.5 w-32 h-32 rounded-lg object-contain' />
          ) : (
            <img src={newImage ? URL.createObjectURL(formData.image) : upload_area} alt="" className='mt-2.5 w-32 h-32 rounded-lg object-contain' />
          )}
        </label>
        <Button text={'Clear Image'} onClick={deleteImage} type='button' />
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        <Button text={blogPost ? 'Save Changes' : 'Create Blog'} type='submit' />
      </form>
    </>
  );
}

export default BlogForm;
