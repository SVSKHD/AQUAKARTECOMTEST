const UserHeader = ({ name, id, date }) => {
  return (
    <>
      <div className="card-body">
        <h1>
          Hello <span className="aqua-username">{name}</span>
          <p className="text-muted user-dahsboard-id">id:{id}</p>
          <p className="text-muted user-since">User Since : {date}</p>
        </h1>
      </div>
    </>
  );
};
export default UserHeader;
