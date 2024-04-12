import AquaDialog from "@/reusables/dialog";
import AquaHeading from "@/reusables/heading";

const AquaAddressDialog = ({ show, hide, content, title }) => {
  return (
    <AquaDialog
      title={<AquaHeading decorate={true} content={title} level={2} />}
      show={show}
      hide={hide}
    >
      <AquaInput label="Street or Appartment" />
      <AquaInput label="City" />
      <AquaInput label="State" />
      <AquaInput label="Postal Code" />
    </AquaDialog>
  );
};
export default AquaAddressDialog;
