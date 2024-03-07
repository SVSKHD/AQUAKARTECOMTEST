const UserDashboardCartCard = ({r}) => {
    const {title , photos } = r
    return (
        <>
            <div class="card mb-3" style={{ maxWidth: "540px;" }}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={photos[0].secure_url} class="img-fluid rounded-start" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{title}</h5>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserDashboardCartCard