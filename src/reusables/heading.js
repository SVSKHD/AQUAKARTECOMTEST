const AquaHeading = ({ level, children, center }) => {
  const HeadingTag = `h${level}`;

  return (
    <div className={center ? "text-center" : ""}>
      <HeadingTag className="mt-3">{children}</HeadingTag>
    </div>
  );
};
export default AquaHeading;
