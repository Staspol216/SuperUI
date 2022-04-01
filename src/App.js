import Timeline from "./Timeline";
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
        customDots={{
          create: <ClockIcon style={{ fontSize: '14px' }} color="blue" />,
          delete: <Smile style={{ fontSize: '14px' }} color="red" />,
          add: <Bolt style={{ fontSize: '14px' }} color="green" />
        }}
        partDataReload={false}
        reverse={false}
        horizontal={true}
      />
    </div>
  );
}

export default App;
