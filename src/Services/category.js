import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_API_URL


const getCategories = async () => (
    await axios.get(`${baseUrl}/category/get`)
)

const getCategoryById = async (query) => (
    await axios.get(`${baseUrl}/category/get?id=${query}`)
)

const getCategoryByTitle = async (query) => (
    await axios.get(`${baseUrl}/category/get?title=${query}`)
)


const AquaCategoryOperations = () => {
    return {
        getCategories,
        getCategoryById,
        getCategoryByTitle
    }
}

export default AquaCategoryOperations




