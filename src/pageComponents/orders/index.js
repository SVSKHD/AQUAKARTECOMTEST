import AquaLayout from "@/Layout/Layout";
import AquaOrderOperatrions from "@/Services/order";
import AquaToast from "@/reusables/js/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AquaOrdersComponent = () => {
  const { user, cartCount } = useSelector((state) => ({ ...state }));
  const [status, setStatus] = useState({ succcess: false, failure: false });
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  const userId = user.user._id;
  console.log("user", userId);
  const { UpdateOrder } = AquaOrderOperatrions();
  useEffect(() => {
    if (id && user.user._id) {
      // Ensure 'id' and 'userId' are available
      UpdateOrder(id, user.user._id, { items: cartCount })
        .then((res) => {
          console.log("res", res);

          AquaToast("success", "success");
        })
        .catch(() => {
          AquaToast("sorry please try again", "error");
        });
    }
  }, [user.user._id, cartCount, UpdateOrder, id]);

  const seo = {
    title: "Aquakart | Order Confirmation",
  };
  return (
    <AquaLayout seo={seo} container={true}>
      <div className="card shadow-lg mb-4 rounded-3">
        <div className="card-body">
          <div></div>
        </div>
      </div>
    </AquaLayout>
  );
};
export default AquaOrdersComponent;
