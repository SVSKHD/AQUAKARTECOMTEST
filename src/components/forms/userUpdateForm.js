import AquaInput from "@/reusables/input";
import AquaTextAreaInput from "@/reusables/textarea";

const UserForm = () => {
  return (
    <>
      <form>
        <div className="row">
          <div className="col">
            <AquaInput label="email" />
          </div>
          <div className="col">
            <AquaInput label="email" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <AquaInput label="phone" />
          </div>
          <div className="col">
            <AquaTextAreaInput />
          </div>
        </div>
        <button className="btn btn-secondary">Submit</button>
      </form>
    </>
  );
};
export default UserForm;
