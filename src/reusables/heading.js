const AquaHeading = ({ level, children, center, decorate }) => {
  const HeadingTag = `h${level}`;


  const divClassNames = `${center ? "text-center" : ""} ${decorate ? "decorate" : ""}`.trim();

  return (
    <div className={divClassNames}>
      <HeadingTag className="mt-2">{children}</HeadingTag>
    </div>
  );
};

export default AquaHeading;
