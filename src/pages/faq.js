import AquaLayout from "@/Layout/Layout"
import AquaLargeTitle from "@/reusables/largeTitle"

const AquaFaq = () => {
    const seo = {
        "title": "Aquakart | Frequently Asked questions"
    }
    return (
        <AquaLayout seo={seo}>
            <AquaLargeTitle display={2}>FAQ</AquaLargeTitle>
            <p className="text-muted">Frequently Asked questions</p>
            <hr/>
            
        </AquaLayout>
    )
}
export default AquaFaq