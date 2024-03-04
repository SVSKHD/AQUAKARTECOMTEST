
const UserHeader = ({name}) => {
    return (
        <>
            <div className="card-body">
                <h1>Hello <span className="aqua-username">{name}</span></h1>
            </div>
        </>
    )
}
export default UserHeader