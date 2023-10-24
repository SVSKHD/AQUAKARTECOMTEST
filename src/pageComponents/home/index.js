import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaInput from "@/reusables/input";
import AquaCategoryHolder from "./categoryHolder";
import AquaSubCategoryHolder from "./subCategoryHolder";

const AquaHomeComponent = () => {
    const SeoData = {
        title: "Aquakart | Online Shopping for Softeners purifiers and many more"
    }

    return (
        <>
            <AquaLayout seo={SeoData}>
                <AquaCategoryHolder />
                <AquaSubCategoryHolder />
                <AquaHeading level={1}>Hello Aquakart</AquaHeading>
            </AquaLayout>
        </>
    )
}
export default AquaHomeComponent
