const StatCard = ({ title, value, small }) => {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="card-title text-muted">{title}</h6>
          <h3 className="card-text">{value}</h3>
          {small && <div className="text-muted small">{small}</div>}
        </div>
      </div>
    </div>
  );
};
export default StatCard;