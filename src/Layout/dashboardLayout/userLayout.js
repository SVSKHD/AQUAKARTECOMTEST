import { useDispatch, useSelector } from "react-redux";
import UserHeader from "./userHeader";
import AquaUserHead from "./head";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import UserOperations from "@/Services/user";
import moment from "moment";

const UserLayout = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const Router = useRouter();

  const createUserName = (email) => {
    const usernamePart = email?.split("@")[0]; 
    return usernamePart?.split(".")[0] + "."; 
  };

  useEffect(() => {
    if (!user) {
      dispatch({
        type: "SET_AUTH_DIALOG_VISIBLE",
        payload: true,
      });
    }
  }, [user, dispatch]);

  const menu = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "orders",
      path: "/dashboard/orders",
    },
    {
      title: "wish-list",
      path: "/dashboard/wishlist",
    },
    {
      title: "cart",
      path: "/dashboard/cart",
    },
  ];
  const userSince = (userData) => {
    const date = moment(userData).fromNow();
    return date
  };
  return (
    <>
      <div>
        <AquaUserHead />
        <div className="container">
          <div className="row mt-5 mb-3">
            <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
              <div className="card shadow-lg rounded-4">
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    {menu.map((r, i) => (
                      <a
                        key={i}
                        href={r.path}
                        className={`list-group-item list-group-item-action dashboard-list-item ${
                          Router.pathname === r.path ? "active rounded-4" : ""
                        }`}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1 dashboard-menu-item">
                            {r.title}
                          </h5>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
              <div className="card shadow-lg mb-1 rounded-4">
                <div className="card-body">
                  <UserHeader
                    name={createUserName(user?.user?.email)}
                    id={user?.user?.id}
                    date={userSince(user?.user?.userSignedupDate)}
                  />
                </div>
              </div>
              <div className="card shadow-lg user-dashboard-height rounded-4">
                <div className="card-body">
                  <div className="container">{props.children}</div>
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
