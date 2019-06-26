import { key } from './keys'

const proxyUrl = "https://cors-anywhere.herokuapp.com/"

export const getAlertLocations = (id) => {
  const url = `https://brendan.thecrag.com/api/node/id/${id}?show=children,ancestors&key=${key}`
  fetch(proxyUrl + url)
    .then(res => {
      return res.json()
    })
    .then(data => {
      var result = []
      data.data.ancestors.forEach(ancestor => {
        result.push({
          id: ancestor.id,
          name: ancestor.name
        })
      })
      return result
    })
} 