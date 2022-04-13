import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Timeline.scss';

const TimelineContext = createContext(undefined);

const useTimelineContext = () => {
    const context = useContext(TimelineContext);

    if (!context) {
        throw new Error('This component must be used within a <AuthForm> component.');
    }

    return context;
}

const Timeline = ({ children, ...props }) => {
    const { position = "left",
        timelineData = [],
        partDataReload = false,
        dotIcons = {},
        reverse = false,
        horizontal = false,
        timelineHorizontalWrap = false } = props;

    const [eventsList, setEventsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [eventsEnded, setEventsEnded] = useState(false);

    useEffect(() => {
        if (reverse) timelineData.reverse();
        partDataReload && !children ? onLoadItems(timelineData, offset) : setEventsList(timelineData);
    }, [])

    const value = useMemo(
        () => ({ dotIcons }), [dotIcons]
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
        "timeline-container-left": position === "left" && !horizontal,
        "timeline-container-right": position === "right" && !horizontal,
        "timeline-container-horizontal": horizontal,
        "timeline-wrap": timelineHorizontalWrap && horizontal
    });

    let dataItems;

    if (!children && eventsList) {
        dataItems = eventsList.map((data, idx) => (
            <TimelinePropsItem
                data={data}
                key={idx}
                dotIcons={dotIcons}
                lastItem={(eventsList.length - 1) === idx}
            />
        ))
    } else {
        children = React.Children.map(children, (child, i) => {
            if (React.Children.count(children) === (i + 1)) {
                return React.cloneElement(child, {
                    lastItem: true
                })
            } else {
                return child
            }
        });
    }

    return (
        <TimelineContext.Provider value={value}>
            <div className="timeline-list">
                <ul className={containerClass}>
                    {dataItems}
                    {children}
                </ul>
                <button
                    className={`button-timeline button-timeline-${position}`}
                    disabled={eventsEnded}
                    style={{ "display": partDataReload && !children ? "inline-block" : "none" }}
                    onClick={() => onLoadItems(timelineData, offset)}>
                    <div className="btn-timeline-text"><span>More</span></div>
                </button>
            </div>
        </TimelineContext.Provider>
    );
}

const TimelinePropsItem = ({ data, lastItem, dotIcons }) => {
    const headClass = cn("timeline-item-head", `timeline-item-head-${data.type ? data.type : "default"}`);
    let itemIcon;

    if (dotIcons) {
        itemIcon = dotIcons[data.type]
    }
    return (
        <li className="timeline-item">
            {!lastItem ? <div className="timeline-item-tail"></div> : null}
            {itemIcon ? <div className='timeline-item-head timeline-item-head-custom'><span className='timeline-icon'>{itemIcon}</span></div>
                : <div className={headClass} />}
            <div className="timeline-item-content">
                {`${data?.content?.text} ${data?.content?.changes} ${data?.content?.name} ${data?.date}`}
            </div>
        </li >
    )
}

Timeline.Item = function TimelineItem({ lastItem, children, icon, dotColor, type }) {
    const headClass = cn("timeline-item-head", `timeline-item-head-${type ? type : "default"}`);
    const { dotIcons } = useTimelineContext();
    let itemIcon;

    if (dotIcons) {
        if (React.isValidElement(icon)) {
            itemIcon = icon;
        }
        if (dotIcons[type] && !React.isValidElement(icon)) {
            itemIcon = dotIcons[type];
        }
    }
    return (
        <li className="timeline-item">
            {!lastItem ? <div className="timeline-item-tail"></div> : null}
            {itemIcon ?
                <div className='timeline-item-head timeline-item-head-custom'><span className='timeline-icon'>{itemIcon}</span></div>
                : <div className={headClass} style={{ borderColor: dotColor }} />}
            <div className="timeline-item-content">
                {children}
            </div>
        </li >
    )
};

export { Timeline };

Timeline.Item.propTypes = {
    lastItem: PropTypes.bool,
    icon: PropTypes.element,
    dotColor: PropTypes.string,
    type: PropTypes.oneOf(['add', 'edit', 'delete', 'create']),
}

Timeline.propTypes = {
    position: PropTypes.oneOf(['left', 'right']).isRequired,
    timelineData: PropTypes.arrayOf(PropTypes.object),
    partDataReload: PropTypes.bool,
    dotIcons: PropTypes.shape({
        create: PropTypes.element,
        delete: PropTypes.element,
        add: PropTypes.element,
        edit: PropTypes.element
    }),
    reverse: PropTypes.bool,
    horizontal: PropTypes.bool,
    timelineHorizontalWrap: PropTypes.bool,
    children: PropTypes.node,
}