import AquaInput from "@/reusables/input";

const UserPasswordForm = ({ password, passwordMatch }) => {
  return (
    <>
      <AquaInput
        type="password"
        label="enter your previous password"
        value={password}
      />
      <button className="btn btn-dark" disabled={passwordMatch}>
        submit
      </button>
      {passwordMatch ? (
        <>
          <AquaInput
            type="password"
            label="enter new password"
            placeholder="enter new password"
          />
          <AquaInput
            type="password"
            label="confirm entered password"
            placeholder="confirm entered password"
          />
          <button className="btn btn-dark">submit</button>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default UserPasswordForm;
