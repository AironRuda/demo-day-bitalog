import Team from "./Team";
import NotificationField from "./NotificationField";

const TeamInfo: React.FunctionComponent = (props) => {
  return (
    <div className="flex flex-row">
      <Team />
      <NotificationField />
    </div>
  );
};

export default TeamInfo;
