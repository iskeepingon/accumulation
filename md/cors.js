import axios from 'axios'

const token = localStorage.getItem('token')
const request = ({ url, method, data, success, error }) => {
    axios({
        url: url,
        method: method,
        data: data,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'B2B-Authorization': token == null ? '' : token
        }
    })
        .then(res => {
            //成功
            if (typeof success === 'function') {
                success(res)
            }
        })
        .catch((err) => {
            //失败
            if (typeof error === 'function') {
                error(err)
            }
        })
}
export default request