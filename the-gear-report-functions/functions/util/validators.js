const isEmpty = (string) => {
  if (!string) return true
  if (string.trim() === '') return true
  else return false 
}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(email.match(regEx)){
    return true
  } else {
    return false
  }
}

exports.validateSignUpData = (data) => {
  let errors = []
  if (isEmpty(data.email)) {
    errors.push('Email must not be empty')
  } else if (!isEmail(data.email)) {
    errors.push('Must be a valid email address')
  }

  if (isEmpty(data.password)) errors.push('Password must not be empty')
  if (!data.password || !data.confirmPassword) errors.push('Password must not be empty')
  if (data.password !== data.confirmPassword) errors.push('Passwords must match')
  if (isEmpty(data.handle)) errors.push('Name must not be empty')
  if (isEmpty(data.city)) errors.push('City must not be empty')
  return {
    errors,
    valid: errors.length === 0 ? true : false
  }
}

exports.validateLoginData = (data) => {
  let errors = {}

  if(isEmpty(data.email)) errors.email = 'Must not be empty'
  if(isEmpty(data.password)) errors.password = 'Must not be empty'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.reduceUserDetails = (data) => {
  let userDetails = {}

  // makes sure we don't submit empty strings overwriting prev user data

  if(data.bio && !isEmpty(data.bio.trim())) userDetails.bio = data.bio
  if(data.city && !isEmpty(data.city.trim())) userDetails.city = data.city
  if(data.occupation && !isEmpty(data.occupation.trim())) userDetails.occupation = data.occupation
  if(data.experience && !isEmpty(data.experience.trim())) userDetails.experience = data.experience
  if(data.phone && !isEmpty(data.phone.trim())) userDetails.phone = data.phone
  if(data.email && !isEmpty(data.email.trim())) userDetails.email = data.email
  if(data.website && !isEmpty(data.website.trim())){
    // validate if user enters www.test.com as opposed to http://www.test.com
    if(data.website.trim().substring(0, 4) !== 'http'){
      userDetails.website = `http://${data.website.trim()}`
    } else userDetails.website = data.website
  }
  return userDetails
}