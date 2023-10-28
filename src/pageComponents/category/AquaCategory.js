import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AquaLayout from "@/Layout/Layout"
import AquaCategoryOperations from "@/Services/category"
import AquaCommonCategoryCard from "@/components/cards/categoryPageCard"



const AquaCategoryPageComponent = () => {
    const [category, setCategory] = useState({})
    const { getCategoryByTitle } = AquaCategoryOperations()
    const SeoData = {
        title: `Aquakart | `
    }

    const router = useRouter()
    let title = router.query.id
    console.log("title", title)

    const loadCategory = useCallback(() => {
        getCategoryByTitle(title).then((res) => {
            setCategory(res.data)
        })
            .catch((err) => {
                console.log("err", err)
            })
    }, [getCategoryByTitle, setCategory])

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
export default AquaCategoryPageComponent
