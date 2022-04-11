import { Timeline } from "./Timeline";
import timelineData from './database.json';
import { ReactComponent as ClockIcon } from "./icons/clock.svg";
import { ReactComponent as Bolt } from "./icons/uil_bolt.svg";
import { ReactComponent as Smile } from "./icons/smile.svg";


const App = () => {
  return (
    <div className="App">
      <Timeline
        timelineData={timelineData}
        position={"left"}
        dotIcon={{
          create: <ClockIcon color="blue" />,
          delete: <Smile color="red" />,
          add: <Bolt color="green" />
        }}
        partDataReload={true}
        reverse={false}
        horizontal={true}
        timelineHorizontalWrap={true}
      >
        <Timeline.Item type={"edit"} dotIcon={{ delete: <Smile color="red" /> }}>Beer</Timeline.Item>
      </Timeline>
    </div>
  );
}

export default App;
