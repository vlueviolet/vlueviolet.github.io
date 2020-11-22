const CardComponent = ({ data, onClickCB }) => {
  return (
    <div className="card-list-item" onClick={() => onClickCB(data.idx)}>
      <span className="card-list-name">이름 : {data.name}</span>
      <span className="card-list-job">직업 : {data.job}</span>
    </div>
  );
};
export default CardComponent;
