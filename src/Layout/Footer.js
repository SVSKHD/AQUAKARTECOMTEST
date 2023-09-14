import AquaCard from "@/reusables/card"
import AquaHeading from "@/reusables/heading"

const AquaFooter = () => {
    const date = new Date()
    const Year = date.getFullYear()
    return (
        <>
            <div>
                <AquaCard>
                    <AquaCard>
                        <div className="text-center">
                            <AquaHeading level={5}>AquaKart © {Year}</AquaHeading>
                        </div>
                    </AquaCard>
                </AquaCard>
            </div>
        </>
    )
}
export default AquaFooter