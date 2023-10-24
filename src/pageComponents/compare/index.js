import AquaLayout from "@/Layout/Layout"
import AquaHeading from "@/reusables/heading"

const AquaComparePageComponent = () => {
    const SeoData = {
        title: "Aquakart | Compare"
    }
    return (
        <>
            <AquaLayout seo={SeoData}>
                <AquaHeading level={1}>Hello Aquakart Compare</AquaHeading>
            </AquaLayout>
        </>
    )
}
export default AquaComparePageComponent