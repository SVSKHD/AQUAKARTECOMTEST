const AquaStandardShadowCard = (props) => {
  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">{props.children}</div>
      </div>
    </>
  );
};
export default AquaStandardShadowCard;
