import cn from 'classnames';

const TimelineItem = (props) => {
    const { data, position, lastItem, dots, horizontal } = props;
    const { content, type, date } = data;
    const { name, text, changes } = content;

    const headClass = cn("timeline-item-head", `timeline-item-head-${type ? type : "default"}`);

    return (
        <li className={horizontal ? `timeline-item timeline-item-horizontal` : `timeline-item timeline-item-${position}`}>
            {!lastItem ? <div className="timeline-item-tail"></div> : null}
            {dots[type] ? <div className='timeline-item-head timeline-item-head-custom'><span className='timeline-icon'>{dots[type]}</span></div> : <div className={headClass} />}
            <div className="timeline-item-content">
                {text} {changes} {name} {date}
            </div>
        </li >
    )
};

export default TimelineItem;