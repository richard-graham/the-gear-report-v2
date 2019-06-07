import { key } from './keys'

const proxyUrl = "https://cors-anywhere.herokuapp.com/"

export const getChildren = (parent) => {
  const url = `https://brendan.thecrag.com/api/area/id/${parent}/children?key=${key}`
  fetch(proxyUrl + url)
    .then(res => {
      console.log(res.json());
    })
}
