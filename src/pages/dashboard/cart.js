import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserDashboardCartCard from "@/components/cards/userDashboardCartCard";
import AquaHeading from "@/reusables/heading";
import Link from "next/link";
import { useSelector } from "react-redux";

const UserCart = () => {
  const { cartCount } = useSelector((state) => ({ ...state }));
  return (
    <>
      <UserLayout>
        <AquaHeading content={"Cart"} decorate={true} level={2} />
        {cartCount.length > 0 ? (
          <>
            <div className="row">
              {cartCount.map((r, i) => (
                <>
                  <div key={i} className="col">
                    <UserDashboardCartCard r={r} />
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
        <div class="mt-1 d-grid gap-2">
          <Link class="btn btn-primary" href="/shop" type="button">
            {cartCount.length > 0
              ? "Continue to Shop"
              : "Add Something to cart"}
          </Link>
        </div>
      </UserLayout>
    </>
  );
};
export default UserCart;
