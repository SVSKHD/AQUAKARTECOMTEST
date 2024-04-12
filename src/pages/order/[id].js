import AquaOrdersComponent from "@/pageComponents/orders";

const AquaOrders = ({ params }) => {
  return <AquaOrdersComponent id={params.id} />;
};
export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}
export default AquaOrders;
