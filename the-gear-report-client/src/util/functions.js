export const checkIfCrag = (type, subType) => {
  if (
    type === "Cr" ||
    type === "Cl" ||
    type === "Fi" 
    ){
      return true
    } else if (subType){
      if(
        subType === "Crag" ||
        subType === "Cliff" ||
        subType === "Field" 
      ){
        return true
      }
    } else {
      return false
    }
}
