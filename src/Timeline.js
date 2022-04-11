import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import cn from 'classnames';

const TimelineContext = createContext();

const useTimelineContext = () => {
    const context = useContext(TimelineContext);
    if (!context) {
        throw new Error("No context found for Timeline");
    }
    return context;
}

const Timeline = ({ children, ...props }) => {
    const { position = "left",
        timelineData = [],
        partDataReload = false,
        dotIcon = {},
        reverse = false,
        horizontal = false,
        timelineHorizontalWrap = false } = props;


    const [eventsList, setEventsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [eventsEnded, setEventsEnded] = useState(false);

    useEffect(() => {
        if (reverse) timelineData.reverse();
        partDataReload ? onLoadItems(timelineData, offset) : setEventsList(timelineData);
    }, [])

    const value = useMemo(
        () => ({
            dotIcon
        }),
        [dotIcon]
    );

    const onLoadItems = (arr, offset) => {
        let ended = false;
        const newEventsList = arr.slice(offset, offset + 5);
        if (newEventsList.length < 5) {
            ended = true;
        }
        setOffset(offset => offset + 5);
        setEventsList(eventsList => [...eventsList, ...newEventsList]);
        setEventsEnded(ended);
    }
    const containerClass = cn("timeline-container", {
        "timeline-container-horizontal": horizontal,
        "timeline-wrap": timelineHorizontalWrap && horizontal
    });

    const items = eventsList.map((data, idx) => (
        <Timeline.Item
            position={position}
            data={data}
            type={data.type}
            key={idx}
            lastItem={(eventsList.length - 1) === idx}
            dotIcon={dotIcon}
            horizontal={horizontal} />
    ))

    return (
        <TimelineContext.Provider value={value}>
            <div className="timeline-list">
                <ul className={containerClass}>
                    {items}
                    {children}
                </ul>
                <button
                    className={`button-timeline button-timeline-${position}`}
                    disabled={eventsEnded}
                    style={{ "display": partDataReload ? "inline-block" : "none" }}
                    onClick={() => onLoadItems(timelineData, offset)}>
                    <div className="btn-timeline-text"><span>More</span></div>
                </button>
            </div>
        </TimelineContext.Provider>

    );
}

Timeline.Item = function TimelineItem({ data, lastItem, horizontal, position, type }) {
    const { dotIcon } = useTimelineContext();

    const headClass = cn("timeline-item-head", `timeline-item-head-${type ? type : "default"}`);

    return (
        <li className={horizontal ? `timeline-item timeline-item-horizontal` : `timeline-item timeline-item-${position}`}>
            {!lastItem ? <div className="timeline-item-tail"></div> : null}
            {dotIcon[type] ? <div className='timeline-item-head timeline-item-head-custom'><span className='timeline-icon'>{dotIcon[type]}</span></div> : <div className={headClass} />}
            <div className="timeline-item-content">
                {data?.content ? `${data?.content?.text} ${data?.content?.changes} ${data?.content?.name} ${data?.content?.date}` : "yolo"}
            </div>
        </li >
    )
};

export { Timeline };