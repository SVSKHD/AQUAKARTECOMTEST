import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_API_URL


const getSubCategories = async () => (
    await axios.get(`admin/crm/api/subcategory/get`)
)

const getSubCategoryById = async (query) => (
    await axios.get(`admin/crm/api/subcategory/get?id=${query}`)
)

const getSubCategoryByTitle = async (query) => (
    await axios.get(`admin/crm/api/subcategory/get?title=${query}`)
)



const AquaSubCategoryOperations = () => {
    return {
        getSubCategories,
        getSubCategoryById,
        getSubCategoryByTitle
    }
}

export default AquaSubCategoryOperations




