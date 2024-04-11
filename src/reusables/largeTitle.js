const AquaLargeTitle = ({ display, children }) => {
  return (
    <>
      <div className={`display-${display}`}>{children}</div>
    </>
  );
};
export default AquaLargeTitle;
