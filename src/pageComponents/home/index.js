import AquaLayout from "@/Layout/Layout";
import AquaCategoryHolder from "./categoryHolder";
import AquaSubCategoryHolder from "./subCategoryHolder";
import AquaProductHolder from "./productHolder";

const AquaHomeComponent = () => {
    const SeoData = {
        title: "Aquakart | Online Shopping for Softeners purifiers and many more"
    }

    return (
        <>
            <AquaLayout seo={SeoData}>
                <AquaCategoryHolder />
                <AquaSubCategoryHolder />
                <AquaProductHolder/>
            </AquaLayout>
        </>
    )
}
export default AquaHomeComponent
