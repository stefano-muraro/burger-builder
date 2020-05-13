import axios from "axios"

const instance = axios.create({
  baseURL: "https://react-burger-builder-435ab.firebaseio.com/"
})

export default instance