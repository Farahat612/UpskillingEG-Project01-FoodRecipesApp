/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CategoriesContext } from '../../../contexts/categoriesContext'
import { TagsContext } from '../../../contexts/tagsContext'
import { RecipesContext } from '../../../contexts/recipesContext'
import { useCategories } from '../../../hooks/categories'
import { useRecipes } from '../../../hooks/recipes'
import { useNavigate } from 'react-router-dom'
import { staticURL } from '../../../utils/api'

import { LoadingScreen } from '../../../components/shared'
import { Form, InputGroup } from 'react-bootstrap'
import { FaImage } from 'react-icons/fa'
import nodataImg from '../../../assets/images/no-data.png'

const RecipesForm = ({ recipe }) => {
  const navigate = useNavigate()
  // categories for list
  const { state: categoriesState } = useContext(CategoriesContext)
  let categoriesTotal =
    categoriesState.totalNumberOfRecords != 0
      ? categoriesState.totalNumberOfRecords
      : 15
  const { getCategories } = useCategories()
  // tags for list
  const { state: tagsState } = useContext(TagsContext)
  // get categories
  useEffect(() => {
    getCategories(1, categoriesTotal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // userecipies hook
  const { addRecipe, updateRecipe } = useRecipes()
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  // creating formData
  const appendFormData = (data) => {
    const formData = new FormData()
    for (let key in data) {
      key === 'recipeImage'
        ? formData.append(key, data[key][0])
        : formData.append(key, data[key])
    }
    return formData
  }
  // loading state from recipes context
  const { state } = useContext(RecipesContext)

  // submit function
  const onSubmit = (data) => {
    const formData = appendFormData(data)
    recipe ? updateRecipe(formData, recipe.id) : addRecipe(formData)
    state.loading != true && navigate('/recipes')
  }

  // preview image
  const [previewImage, setPreviewImage] = useState(null)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  if (state.loading) {
    return <LoadingScreen />
  }

  return (
    <div className='container mt-5'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Name'
            {...register('name', {
              required: 'Recipe Name is required',
            })}
            defaultValue={recipe ? recipe.name : ''}
          />
          {errors.name && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.name.message}
            </div>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Select
            aria-label='Select Recipe Tag'
            {...register('tagId', {
              required: 'Recipe Tag is required',
            })}
            defaultValue={recipe ? recipe.tag?.id : ''}
          >
            <option value='' className='text-muted'>
              {' '}
              Select Tag
            </option>
            {tagsState.tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </Form.Select>
          {errors.tagId && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.tagId.message}
            </div>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control
            type='number'
            placeholder='Price'
            {...register('price', {
              required: 'Price is required',
            })}
            defaultValue={recipe ? recipe.price : ''}
          />
          {errors.price && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.price.message}
            </div>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Select
            aria-label='Select Recipe Category'
            {...register('categoriesIds', {
              required: 'Category is required',
            })}
            defaultValue={
              recipe && recipe.category ? recipe.category[0]?.id : ''
            }
          >
            <option value='' className='text-muted'>
              {' '}
              Select Category
            </option>
            {categoriesState.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          {errors.categoriesIds && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.categoriesIds.message}
            </div>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control
            as='textarea'
            placeholder='Description ...'
            {...register('description', {
              required: 'Recipe Description is required',
            })}
            defaultValue={recipe ? recipe.description : ''}
          />
          {errors.description && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.description.message}
            </div>
          )}
        </Form.Group>

        <div className='row my-3'>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <FaImage />
            </InputGroup.Text>
            <Form.Control
              type='file'
              {...register('recipeImage')}
              onChange={handleImageChange}
            />

            <img
              src={
                previewImage
                  ? previewImage
                  : recipe?.imagePath
                  ? `${staticURL}/${recipe.imagePath}`
                  : nodataImg
              }
              alt='recipe'
              className='img-fluid rounded-2 d-inline-block ms-2'
              style={{
                objectFit: 'contain',
                height: '38px',
                width: '60px',
              }}
            />
          </InputGroup>
        </div>

        <Form.Group className='mb-3'>
          <Form.Control
            type='submit'
            value={recipe ? 'Edit Recipe' : 'Add Recipe'}
            className='btn btn-success w-100'
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default RecipesForm

// propTypes
RecipesForm.propTypes = {
  recipe: PropTypes.object,
}
