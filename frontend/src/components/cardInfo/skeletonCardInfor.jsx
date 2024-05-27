import Loading from "../loading/Loading"

const SkeletonCardInfor = ({title, Icon}) => {
    return (
        <div className="cardInfoContainer">
          <div className="row">
            <Icon />
            <h2>{title}</h2>
          </div>
          <ul className="elements">
            <Loading />
          </ul>
        </div>
    )
}

export default SkeletonCardInfor