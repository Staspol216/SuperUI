import { useState, useEffect } from 'react';
import TimelineItem from './TimelineItem';

const Timeline = (props) => {
    const { position = "left", timelineData = [], partDataReload = false, customDots = {}, reverse = false, horizontal = false } = props;


    const [eventsList, setEventsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [eventsEnded, setEventsEnded] = useState(false);

    useEffect(() => {
        if (reverse) timelineData.reverse();
        partDataReload ? selectPartItems(timelineData, offset) : setEventsList(timelineData);
    }, [])

    const selectPartItems = (arr, offset) => {
        let ended = false;
        const newEventsList = arr.slice(offset, offset + 5);
        if (newEventsList.length < 5) {
            ended = true;
        }
        setOffset(offset => offset + 5);
        setEventsList(eventsList => [...eventsList, ...newEventsList]);
        setEventsEnded(ended);
    }

    const renderItems = (arr) => {
        return (
            <ul className={horizontal ? "timeline-container-horizontal" : "timeline-container"}>
                {arr.map((data, idx) => (
                    <TimelineItem position={position} data={data} key={idx} lastItem={(arr.length - 1) === idx} dots={customDots} horizontal={horizontal} />
                ))}
            </ul>
        )
    }
    const items = renderItems(eventsList);

    return (
        <div className="timeline-list">
            {items}
            <button
                className={`button-timeline button-timeline-${position}`}
                disabled={eventsEnded}
                style={{ "display": partDataReload ? "inline-block" : "none" }}
                onClick={() => selectPartItems(timelineData, offset)}>
                <div className="btn-timeline-text"><span>More</span></div>
            </button>
        </div>

    );
}

export default Timeline;