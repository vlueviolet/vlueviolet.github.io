const CardComponent = ({ data, onClickCB }) => {
  return (
    <li className="card-list-item" onClick={() => onClickCB(data.id)}>
      <a href="" className="card-list-item-link">
        <dl className="card-list-item-box">
          <dt className="card-list-item-title">Name</dt>
          <dd className="card-list-item-data">
            <span>{data.name}</span>
          </dd>
          <dt className="card-list-item-title">Email</dt>
          <dd className="card-list-item-data">
            <span>{data.email}</span>
          </dd>
          <dt className="card-list-item-title">Website</dt>
          <dd className="card-list-item-data">
            <span>{data.website}</span>
          </dd>
        </dl>
      </a>
    </li>
  );
};
export default CardComponent;
