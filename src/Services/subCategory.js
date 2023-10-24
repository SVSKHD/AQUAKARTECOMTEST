import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_API_URL


const getSubCategories = async () => (
    await axios.get(`${baseUrl}/subcategory/get`)
)

const getSubCategoryById = async (query) => (
    await axios.get(`${baseUrl}/subcategory/get?id=${query}`)
)



const AquaSubCategoryOperations = () => {
    return {
        getSubCategories,
        getSubCategoryById,
    }
}

export default AquaSubCategoryOperations




