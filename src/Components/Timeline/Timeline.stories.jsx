import { Timeline } from './Timeline';
import timelineData from '../../database.json';
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";
import { ReactComponent as Bolt } from "../../icons/uil_bolt.svg";
import { ReactComponent as Smile } from "../../icons/smile.svg";
import { ReactComponent as Ticket } from "../../icons/ticket.svg";


export default {
    title: 'Timeline',
    component: Timeline,
    argTypes: {
        position: {
            control: 'radio',
            description: 'Positioning elements in their container',
            table: {
                defaultValue: { summary: 'left'},
            },
            options: ['left', 'right'],
            
        },
        partDataReload: {
            description: 'Partial 5 items loading by button',
            table: {
                defaultValue: { summary: false},
            },
        },
        reverse: {
            description: 'Change items order (work only with JSON data) ',
            table: {
                defaultValue: { summary: false},
            },
        },
        horizontal: {
            description: 'Horizontal timeline position',
            table: {
                defaultValue: { summary: false},
            },
        },
        timelineHorizontalWrap: {
            description: 'Transition of elements to the next line when the size of the container is reduced',
            table: {
                defaultValue: { summary: false},
            },
        },
        dotIcons: {
            description: 'Icons for each event type',
        },
        timelineData: {
            description: 'JSON data',
        }
    }
}

const Template = (args) => <Timeline {...args} />

export const dataJSON = Template.bind({}) 
dataJSON.args = {
    timelineData: timelineData,
    position: "left",
    dotIcons: {
        create: <ClockIcon color="blue" />,
        delete: <Smile color="red" />,
        add: <Bolt color="green" />,
        edit: <Ticket color="violet" />
    },
    partDataReload: false,
    reverse: false,
    horizontal: false,
    timelineHorizontalWrap: true,
}

export const dataChildren = Template.bind({});

dataChildren.args = {
    timelineData: timelineData,
    position: "left",
    dotIcons: {
        create: <ClockIcon color="blue" />,
        delete: <Smile color="red" />,
        add: <Bolt color="green" />,
        edit: <Ticket color="violet" />
    },
    partDataReload: false,
    reverse: false,
    horizontal: false,
    timelineHorizontalWrap: true,
    children: <>
        <Timeline.Item type={"edit"} >Deleted old feature service site 2015-09-01</Timeline.Item>
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
    </>,
}