import Axios from 'axios'

export default Axios.create({
    baseURL: 'http://localhost/PedFarma2/api/public/api/'
})