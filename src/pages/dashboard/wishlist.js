import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserDashboardFavCard from "@/components/cards/userDashboardFavCard";
import AquaHeading from "@/reusables/heading";
import { useSelector } from "react-redux";

const UserWishList = () => {
  const { favCount } = useSelector((state) => ({ ...state }));
  return (
    <>
      <UserLayout>
        <AquaHeading content={"Wish-List"} decorate={true} level={1} />
        {favCount.length ? (
          <>
            {favCount.map((r, i) => (
              <div key={i}>
                <UserDashboardFavCard r={r} />
              </div>
            ))}
          </>
        ) : (
          "No products are in favorites yet"
        )}
      </UserLayout>
    </>
  );
};
export default UserWishList;
