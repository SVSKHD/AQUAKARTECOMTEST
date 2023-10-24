import AquaCategoryOperations from "@/Services/category"
import AquaImageCard from "@/reusables/imageCard"
import AquaToast from "@/reusables/js/toast"
import AquaCardMultiItemCarousel from "@/reusables/cardCarousel"
import { useEffect, useState, useCallback } from "react"



const AquaCategoryHolder = () => {
    const [categories, setCategories] = useState([])
    const { getCategories } = AquaCategoryOperations()
    const loadCategories = useCallback(() => {
        getCategories().then((res) => {
            console.log("cate", res)
            setCategories(res.data)
        })
            .catch(() => {
                AquaToast("something went wrong", "error");
            })
    }, [getCategories, setCategories])

    useEffect(() => {
        loadCategories()
    }, [loadCategories])

    return (
        <>
            {!categories.length ? <h3>No Categories yet</h3> : (
                <div className="row">
                    <AquaCardMultiItemCarousel>
                        {categories.map((r, i) => (
                            <>
                                <div className="col-md-2 col-lg-3 col-xs-6 col-sm-16">
                                    <AquaImageCard title={r.title} images={r.photos} link={`/category/${r.title}`}/>
                                </div>
                            </>
                        ))}
                    </AquaCardMultiItemCarousel>
                </div>
            )}
        </>

    )
}
export default AquaCategoryHolder