import axios from "axios"

const getCategories = async () => (
    await axios.get(`admin/crm/api/category/get`)
)

const getCategoryById = async (query) => (
    await axios.get(`admin/crm/api/category/get?id=${query}`)
)

const getCategoryByTitle = async (query) => (
    await axios.get(`admin/crm/api/category/get?title=${query}`)
)


const AquaCategoryOperations = () => {
    return {
        getCategories,
        getCategoryById,
        getCategoryByTitle
    }
}

export default AquaCategoryOperations




