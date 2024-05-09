import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import AquaLayout from '@/Layout/Layout';
import AquaOrderOperations from '@/Services/order';
import AquaToast from '@/reusables/js/toast';
import AquaCurrencyFormat from '@/reusables/currencyFormatter';

const AquaOrdersComponent = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { getOrderByTransactionId } = AquaOrderOperations();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const productRes = await getOrderByTransactionId(id);
        if (productRes.success) {
          setProduct(productRes.data);
          dispatch({ type: 'EMPTY_CART' });
        } else {
          throw new Error('Failed to load data');
        }
      } catch (error) {
        AquaToast('Failed to load order details, please try again', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, dispatch, getOrderByTransactionId]);

  const seo = {
    title: 'Aquakart | Order Confirmation',
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AquaLayout seo={seo} container={true}>
      {product && product.data && product.data[0]?.paymentStatus === 'Paid' && (
        <div className='card'>
          <div className='card-header bg-success'>
            <h4 className='display-2 text-white'>Order Placed - <AquaCurrencyFormat amount={product.data[0].totalAmount} /></h4>
          </div>
          <div className='card-body'>
            <h3>Transaction Id : {product.data[0]?.transactionId}</h3>
            <h4>Order Id : {product.data[0]?.orderId}</h4>
            <h6>Ordered Items</h6>
            <hr/>
            {/* Un-comment and adjust the following when needed */}
            {/* {product.data[0].items.map((item, index) => (
              <p key={index}>{item.name}</p>
            ))} */}
          </div>
        </div>
      )}
      <h1>Ordered</h1>
    </AquaLayout>
  );
};

export default AquaOrdersComponent;
