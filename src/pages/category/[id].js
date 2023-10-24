import AquaCategoryPageComponent from "@/pageComponents/category/AquaCategory"

const AquaCategory = ({params}) =>{
return(
    <>
    <AquaCategoryPageComponent id={params.id}/>
    </>
)
}
export function getServerSideProps(context) {
    return {
        props: { params: context.params },
    };
}
export default AquaCategory