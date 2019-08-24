export default promise => {
  return promise
    .then(data => {
      return { data };
    })
    .catch(error => {
      return { error };
    })
}