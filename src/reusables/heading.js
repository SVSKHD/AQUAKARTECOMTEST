const AquaHeading = ({level , children}) =>{
    const HeadingTag = `h${level}`;

    return <HeadingTag>{children}</HeadingTag>;
}
export default  AquaHeading
