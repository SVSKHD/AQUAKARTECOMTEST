import UserLayout from "@/Layout/dashboardLayout/userLayout";
import UserDashboardFavCard from "@/components/cards/userDashboardFavCard";
import { useSelector } from "react-redux";

const UserWishList = () => {
  const { favCount } = useSelector((state) => ({ ...state }));
  return (
    <>
      <UserLayout>
        <h1>Wish list</h1>
        <hr />
        {favCount.length ? (
          <>
            {favCount.map((r, i) => (
              <UserDashboardFavCard r={r} />
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
