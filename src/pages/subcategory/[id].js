import AquaSubCategoryPageComponent from "@/pageComponents/subcategory/AquaSubCategory";

const AquaSubCategory = ({ params }) => {
  return (
    <>
      <AquaSubCategoryPageComponent id={params.id} />
    </>
  );
};
export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}
export default AquaSubCategory;
