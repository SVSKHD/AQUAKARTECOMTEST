import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AquaLayout from "@/Layout/Layout"
import AquaCommonCategoryCard from "@/components/cards/categoryPageCard"
import AquaSubCategoryOperations from "@/Services/subCategory"



const AquaSubCategoryPageComponent = () => {
    const [category, setCategory] = useState({})
    const { getSubCategoryByTitle } = AquaSubCategoryOperations()
    const SeoData = {
        title: `Aquakart | `,
        keywords: category.keywords
    }

    const router = useRouter()
    let title = router.query.id

    const loadCategory = useCallback(() => {
        getSubCategoryByTitle(title).then((res) => {
            setCategory(res.data)
        })
            .catch((err) => {
                console.log("err", err)
            })
    }, [getSubCategoryByTitle, setCategory])

    useEffect(() => {
        loadCategory()
    }, [loadCategory])

    return (
        <>
            <AquaLayout seo={SeoData}>
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                        <AquaCommonCategoryCard data={category} />
                    </div>
                    <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">

                    </div>
                </div>
            </AquaLayout>
        </>
    )
}
export default AquaSubCategoryPageComponent
