import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Form, InputGroup } from 'react-bootstrap'
import { useState } from 'react'
import { FaImage } from 'react-icons/fa'

const RecipesForm = ({ type }) => {
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

  // submit function
  const onSubmit = (data) => {
    const formData = appendFormData(data)
    console.log(formData)
  }

  // preview image
  const [previewImage, setPreviewImage] = useState(null)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className='container mt-5'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Recipe Name'
            {...register('name', {
              required: 'Recipe Name is required',
            })}
          />
          {errors.name && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.name.message}
            </div>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          {/* <Form.Select
            aria-label='Select Recipe Tag'
            {...register('tagId', {
              required: 'Recipe Tag is required',
            })}
          >
            <option value='' className='text-muted'>
              {' '}
              Select Tag
            </option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </Form.Select> */}
          {errors.tagId && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.tagId.message}
            </div>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control
            type='number'
            placeholder='Recipe Price'
            {...register('price', {
              required: 'Price is required',
            })}
          />
          {errors.price && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.price.message}
            </div>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          {/* <Form.Select
            aria-label='Select Recipe Category'
            {...register('categoriesIds', {
              required: 'Category is required',
            })}
          >
            <option value='' className='text-muted'>
              {' '}
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select> */}
          {errors.categoriesIds && (
            <div className='alert alert-danger py-1 my-2'>
              {errors.categoriesIds.message}
            </div>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control
            as='textarea'
            placeholder='Recipe Description ...'
            {...register('description', {
              required: 'Recipe Description is required',
            })}
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
              {...register('recipeImage', {
                required: 'Recipe Image is required',
              })}
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt='recipe'
                className='img-fluid rounded-2'
                style={{
                  objectFit: 'cover',
                  height: '38px',
                  width: '60px',
                }}
              />
            )}
          </InputGroup>
        </div>

        <Form.Group className='mb-3'>
          <Form.Control
            type='submit'
            value={type === 'add' ? 'Add Recipe' : 'Edit Recipe'}
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
  type: PropTypes.string.isRequired,
}
