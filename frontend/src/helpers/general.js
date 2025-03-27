// Check if object is empty
export function isObjEmpty(obj) {
   return Object.keys(obj).length === 0;
}

// Return a dynamic image link with specified path
export function getImageUrl(imgFolder, imgName) {
   return new URL(`/src/assets/img/${imgFolder}/${imgName}`, import.meta.url).href;
}
