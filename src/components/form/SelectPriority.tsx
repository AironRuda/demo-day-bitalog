interface IAppProps {}

const SelectPriority: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div className="btn-group">
      <input type="radio" name="options" data-title="1" className="btn" />
      <input type="radio" name="options" data-title="2" className="btn" />
      <input type="radio" name="options" data-title="3" className="btn" />
    </div>
  );
};

export default SelectPriority;
