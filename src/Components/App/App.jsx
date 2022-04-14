import { Timeline } from "../Timeline/Timeline";
import { Tree } from '../Tree/Tree';
import timelineData from '../../database.json';
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";
import { ReactComponent as Bolt } from "../../icons/uil_bolt.svg";
import { ReactComponent as Smile } from "../../icons/smile.svg";
import { ReactComponent as Ticket } from "../../icons/ticket.svg";


const App = () => {
  return (
    <div className="App">
      {/* <Timeline
        timelineData={timelineData}
        position={"left"}
        dotIcons={{
          create: <ClockIcon color="blue" />,
          delete: <Smile color="red" />,
          add: <Bolt color="green" />,
          edit: <Ticket color="violet" />
        }}
        partDataReload={false}
        reverse={false}
        horizontal={false}
        timelineHorizontalWrap={false}
      >
        <Timeline.Item>Deleted old feature service site 2015-09-01</Timeline.Item>
        <Timeline.Item dotColor={"green"}>Deleted old feature service site 2015-09-02</Timeline.Item>
        <Timeline.Item type={"create"}>Deleted old feature service site 2015-09-03</Timeline.Item>
        <Timeline.Item type={"delete"}>Deleted old feature service site 2015-09-04</Timeline.Item>
        <Timeline.Item type={"delete"}>Deleted old feature service site 2015-09-05</Timeline.Item>
        <Timeline.Item type={"delete"}>Beer</Timeline.Item>
        <Timeline.Item type={"add"}>Beer</Timeline.Item>
        <Timeline.Item type={"add"}>Beer</Timeline.Item>
        <Timeline.Item type={"add"}>Beer</Timeline.Item>
        <Timeline.Item type={"add"}>Beer</Timeline.Item>
        <Timeline.Item type={"create"}>Beer</Timeline.Item>
        <Timeline.Item type={"create"}>Beer</Timeline.Item>
        <Timeline.Item type={"create"}>Beer</Timeline.Item>
        <Timeline.Item type={"edit"}>Beer</Timeline.Item>
        <Timeline.Item type={"edit"}>Beer</Timeline.Item>
        <Timeline.Item type={"edit"}>Beer</Timeline.Item>
        <Timeline.Item type={"edit"}>Beer</Timeline.Item>
        <Timeline.Item type={"edit"}>Beer</Timeline.Item>
      </Timeline> */}


      <Tree />


    </div>
  );
}

export default App;
