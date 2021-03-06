export const checkIfCrag = (type, subType) => {
  if (
    type === "Cr"
    ){
      return true
    } else if (subType){
      if(
        subType === "Crag" ||
        subType === "Sector" ||
        subType === "Area"
      ){
        return true
      }
    } else {
      return false
    }
}

export const checkIfBelowCrag = (type, subType) => {
  if(
    type === "Cl" ||
    type === "Fi"
  ){
    return true
  } else if (
    subType === "Cliff" ||
    subType === "Field" ||
    subType === "Boulder"
  ){
    return true
  } else {
    return false
  }
}

export const isCragOrUnder = (type, subType) => {
  if(
    type === "Cr" ||
    type === "Cl" ||
    type === "Fi" ||
    type === "A" ||
    type === "B"
  ){
    return true
  } else if (
    subType === "Cr" ||
    subType === "Cl" ||
    subType === "Fi" ||
    type === "A" ||
    type === "B"
  ){
    return true
  } else {
    return false
  }
}