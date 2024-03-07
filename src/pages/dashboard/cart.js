import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserDashboardCartCard from "@/components/cards/userDashboardCartCard";
import { useSelector } from "react-redux";

const UserCart = () => {
  const { cartCount } = useSelector((state) => ({ ...state }))
  return (
    <>
      <UserLayout>
        {cartCount.length > 0 ? (<>
          {cartCount.map((r, i) => (
            <>
              <div key={i}>
                <UserDashboardCartCard r={r} />
              </div>
            </>
          ))}
        </>) : ""}
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button">{cartCount.length>0? "Continue to Shop" : "Add Something to cart"}</button>
        </div>
      </UserLayout>
    </>
  );
};
export default UserCart;
