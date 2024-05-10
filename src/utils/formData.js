export const appendFormData = (data) => {
  const formData = new FormData()
  for (let key in data) {
    if (data[key]) {
      key === 'recipeImage' || key === 'profileImage'
        ? formData.append(key, data[key][0])
        : formData.append(key, data[key])
    }
  }
  return formData
}
