import AquaCodPageComponent from "@/pageComponents/orders/cod";

const AquaCodOrders = ({ params }) => {
  return <AquaCodPageComponent id={params.id} />;
};
export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}
export default AquaCodOrders;
