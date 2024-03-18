import AquaHeading from "@/reusables/heading";
import AquaInput from "@/reusables/input";
import AquaTextAreaInput from "@/reusables/textarea";

const UserForm = (address, contactDetails) => {
  return (
    <>
      <form>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <AquaHeading level={4}>Contact Details</AquaHeading>
            <AquaInput label="Alternating Email" value={contactDetails.alternativeEmail}/>
            <AquaInput label="phoneNo" value={contactDetails.phoneNo} />
          </div>
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
            <AquaHeading level={4}>Address</AquaHeading>
            <div className="row">
              { }
            </div>
            <div>
              <AquaInput label="street" />
              <AquaInput label="city" />
              <AquaInput label="state" />
              <AquaInput label="postal-code" />
            </div>
          </div>
          <button className="btn btn-primary">
            update details
          </button>
        </div>
      </form>
    </>
  );
};
export default UserForm;
