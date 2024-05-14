import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import InputField from './InputField';
import { Button } from './Button';
import upload_area from '../assets/upload_area.svg';

const BlogForm = ({ blogPost }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [prevImg, setPrevImg] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    selectedCategory: '',
    image: '',
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch('/hashtags');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
      formData.selectedCategory = data[0].name;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (blogPost) {
      const defaultSelectedCategories = blogPost.Hashtags;
      // console.log('formdata.selectedCategories.length', defaultSelectedCategories?.length);
      const firstImage = blogPost.Image
      if (firstImage) {
        setPrevImg(firstImage.url);
      }
      setFormData({
        title: blogPost.title,
        author: blogPost.Author?.name,
        content: blogPost.content,
        selectedCategory: defaultSelectedCategories,
        image: blogPost.image,
      });
    }
  }, [blogPost]);

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
      if (blogPost) {
        await fetch(`/posts/${blogPost.id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form),
        }).then((resp) => resp.json()).then((data) => {
          handlePostResponse(data, 'Post Updated', 'Failed to update post');
        });
      } else {
        await fetch('/posts', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form),
        }).then((resp) => resp.json()).then((data) => {
          handlePostResponse(data, 'Post Added', 'Failed to add post');
        })
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
      <Select
        className="mt-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
        name="selectedCategory"
        options={categories}
        isMulti
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id}
        onChange={(selectedOptions) => {
          const selectedCategories = selectedOptions.map(option => option.name);
          setFormData({ ...formData, selectedCategory: selectedCategories });
        }}

        defaultValue={Array.isArray(formData.selectedCategory) ? 
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
