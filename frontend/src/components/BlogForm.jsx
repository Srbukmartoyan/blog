import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import InputField from './InputField';
import { Button } from './Button';
import upload_area from '../assets/upload_area.svg';

const BlogForm = ({ blogId }) => {


  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [prevImg, setPrevImg] = useState(false);
  const [categories, setCategories] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    selectedCategory: [],
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
    } catch (error) {
      console.error(error);
    }
  }, [categoriesData]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (blogPost) {
      const defaultSelectedCategories = blogPost.Hashtags.map(tag => ({ name: tag.name, id: tag.id }));
      const firstImage = blogPost.Image;
      if (firstImage) {
        setPrevImg(firstImage.url);
      }
      setFormData({
        title: blogPost.title,
        content: blogPost.content,
        selectedCategory: defaultSelectedCategories,
        image: blogPost.image,
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

  const deleteImage = () => {
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

  const uploadImage = async (image) => {
    let responseData = { success: true };
    if (image) {
      let imgFormData = new FormData();
      imgFormData.append('post-img', image);
      await fetch('/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
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
    if (!token) {
      alert('You must be logged in to create or update a post.');
      return;
    }
    let form = formData;
    form.excerpt = form.content.substring(0, 100);

    if ((typeof (form.selectedCategory[0]) == 'object') && !empty) {
      let newSelectedCategory = form.selectedCategory.map(el => el.name);
      form.selectedCategory = newSelectedCategory;
    } else if (empty) {
      form.selectedCategory = [];
    }

    const responseData = await uploadImage(image);

    if (responseData.success) {
      form.image = responseData?.image_url;
      savePost(form, token);
    }
  };

  if (formData.selectedCategory.length > 0) {
    return (
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
          options={categories}
          isMulti
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          onChange={(selectedOptions) => {
            const selectedCategories = selectedOptions.map(option => option.name);
            !selectedCategories.length ? setEmpty(true) : setEmpty(false);
            setFormData({ ...formData, selectedCategory: selectedCategories });
          }}
          defaultValue={formData.selectedCategory}
        />
        <label htmlFor="file-input">
          {prevImg ? (
            <img src={prevImg} alt="" className='mt-2.5 w-32 h-32 rounded-lg object-contain' />
          ) : (
            <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='mt-2.5 w-32 h-32 rounded-lg object-contain' />
          )}
        </label>
        <Button text={'Clear Image'} onClick={deleteImage} type='button' />
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        <Button text={blogPost ? 'Save Changes' : 'Create Blog'} type='submit' />
      </form>
    );
  } else {
    const defaultCategory = categories.length > 0 ? categories[0] : null;
    if (defaultCategory) {
      setFormData({ ...formData, selectedCategory: [defaultCategory] });
    }
  }
}

export default BlogForm;
