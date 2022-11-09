import Service from '../Service'
import { API_URL } from '../../config'

const resource = `${API_URL}/stones`

export default {

  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}?per_page=${itemsPerPage}&page=${page}`)
        .then((response) => {
          console.log('response', response)
            if (response.status === 200) {
                return response.data.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getActiveList () {
      return Service.get(`${resource}/active`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    AddNewItem (data) {
      return Service.post(`${resource}`, data)
      .then((response) => {
        console.log('add new response', response)
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateItem (id, data) {
      return Service.put(`${resource}/${id}`, data)
      .then((response) => {
        // console.log('update response', response)
        if (response.status === 200) {
            return response.data
        }
    })
    },
    deleteItem (id) {
      return Service.delete(`${resource}/${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
