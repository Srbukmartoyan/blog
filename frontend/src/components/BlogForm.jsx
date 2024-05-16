import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import InputField from './InputField';
import { Button } from './Button';
import upload_area from '../assets/upload_area.svg';

const BlogForm = ({ blogPost }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [prevImg, setPrevImg] = useState(false);
  const [categories, setCategories] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
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
  };

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
    if ((typeof(form.selectedCategory[0]) == 'object') && !empty) {
      let newSelectedCategory = form.selectedCategory.map(el => el.name);
      form.selectedCategory = newSelectedCategory;
    } else if (empty){
      form.selectedCategory = [];
    } else {
      console.log(form.selectedCategory, '3 else');

    }
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
      await fetch(blogPost ? `/posts/${blogPost.id}` : '/posts', {
        method: blogPost ? 'PUT' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
      }).then((resp) => resp.json()).then((data) => {
        const successMessage = blogPost ? 'Post Updated' : 'Post Added';
        const failureMessage = blogPost ? 'Failed to update post' : 'Failed to add post';
        handlePostResponse(data, successMessage, failureMessage);
      });
    }
  };

  if (formData.selectedCategory.length > 0) {
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
          cacheOptions
          options={categories}
          isMulti
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          onChange={(selectedOptions) => {
            console.log('changes');
            const selectedCategories = selectedOptions.map(option => option.name);
            !selectedCategories.length ? setEmpty(true): setEmpty(false);
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
