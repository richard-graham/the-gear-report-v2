export const checkIfCrag = (type, subType) => {
  if (
    type === "Cr"
    ){
      return true
    } else if (subType){
      if(
        subType === "Crag"
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
    subType === "Cl" ||
    subType === "Fi"
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
    type === "Fi"
  ){
    return true
  } else if (
    subType === "Cr" ||
    subType === "Cl" ||
    subType === "Fi"
  ){
    return true
  } else {
    return false
  }
}