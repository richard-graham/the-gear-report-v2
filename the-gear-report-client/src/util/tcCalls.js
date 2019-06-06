import { key } from './keys'

const proxyUrl = "https://cors-anywhere.herokuapp.com/"

export const getChildren = (parent) => {
  const url = `https://brendan.thecrag.com/api/area/id/${parent}/children?key=${key}`
  fetch(proxyUrl + url)
    .then(res => {
      console.log(res.json());
    })
}

export const getNode = (id) => {
  const url = `https://brendan.thecrag.com/api/node/id/${id}?key=${key}`
  return fetch(proxyUrl + url)
    .then(res => res.json())
    .then(data => {
      return data.data
    })
}