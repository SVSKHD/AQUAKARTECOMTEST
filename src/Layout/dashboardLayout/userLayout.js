import { useDispatch, useSelector } from "react-redux";
import UserHeader from "./userHeader";
import AquaUserHead from "./head";

const UserLayout = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  function createUserName(email) {
    const usernamePart = email?.split("@")[0]; // Get the part before '@'
    return usernamePart?.split(".")[0] + "."; // Get the part before the first '.' and add '.' back
  }
  const menu = [
    {
      title: "orders",
      path: "/dashboard/orders",
    },
    {
      title: "wish-list",
      path: "/dashboard/wishlist",
    },
    {
      title: "Saved-Cards",
      path: "/dashboard/saved-cards",
    },
  ];
  return (
    <>
      <div>
        <AquaUserHead />
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="list-group">
                    {menu.map((r, i) => (
                      <a
                        key={i}
                        href={r.path}
                        className="list-group-item list-group-item-action"
                      >
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">{r.title}</h5>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <UserHeader name={createUserName(user?.user?.email)} />
                  <div className="card shadow-lg">
                    <div className="card-body">
                      <div className="container">{props.children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserLayout;
