import { useDispatch, useSelector } from "react-redux"
import UserHeader from "./userHeader"


const UserLayout = (props) => {
    const { user } = useSelector((state) => ({ ...state }));
    function createUserName(email) {
        const usernamePart = email?.split("@")[0]; // Get the part before '@'
        return usernamePart?.split(".")[0] + "."; // Get the part before the first '.' and add '.' back
      }
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-4">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <div className="list-group">

                                    <a href="#" className="list-group-item list-group-item-action">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">List group item heading</h5>
                                            <small class="text-body-secondary">3 days ago</small>
                                        </div>
                                        <p class="mb-1">Some placeholder content in a paragraph.</p>
                                        <small class="text-body-secondary">And some muted small print.</small>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="card shadow-lg">
                            <div className="card-body">
                        <UserHeader name={createUserName(user?.user?.email)} />
                        {props.children}
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default UserLayout