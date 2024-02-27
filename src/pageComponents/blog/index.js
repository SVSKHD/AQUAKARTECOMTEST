import AquaLayout from "@/Layout/Layout"

const AquaBlogComponent = () => {
    const seoData = {"title":"Aquakart | Blogs"}
    return (
        <>
            <AquaLayout seo={seoData}>
                <h1>AquaBlog</h1>
            </AquaLayout>
        </>
    )
}
export default AquaBlogComponent