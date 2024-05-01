const AquaHeading = ({
  level,
  content,
  center,
  decorate,
  customclass,
  link,
}) => {
  const HeadingTag = `h${level}`;

  const divClassNames = `${center ? "text-center" : ""} ${
    decorate ? "decorate" : ""
  } ${customclass || ""}`.trim();

  return (
    <div className={divClassNames}>
      <HeadingTag className="mt-2">
        {link ? (
          <a href={link} style={linkStyle}>
            {content}
          </a>
        ) : (
          content
        )}
      </HeadingTag>
    </div>
  );
};

export default AquaHeading;
