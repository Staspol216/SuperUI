import TimelineItem from './TimelineItem';
import timelineData from './database.json';

const Timeline = ({ itemsPosition }) => {

    return (
        <ul className="timeline-container">
            {timelineData.map((data, idx) => (
                <TimelineItem position={itemsPosition} data={data} key={idx} />
            ))}
        </ul>
    );
}

export default Timeline;