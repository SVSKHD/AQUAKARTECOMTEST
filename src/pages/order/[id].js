import AquaOrdersComponent from "@/pageComponents/orders";
import axios from "axios"

const AquaOrders = ({ initialOrder }) => {
  return <AquaOrdersComponent initialOrder={initialOrder} />;
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  let initialOrder = {};

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/get?transactionId=${id}`);
    initialOrder = res.data.data;
    console.log(initialOrder);
  } catch (err) {
    console.error("Error fetching order:", err.message);
    console.error("Error details:", err.response ? err.response.data : err);
  }

  return {
    props: {
      initialOrder,
    },
  };
}

export default AquaOrders;

