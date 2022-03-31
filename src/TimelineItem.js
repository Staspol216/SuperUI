import cn from 'classnames';

const TimelineItem = (props) => {
    const { data, position } = props;
    const { content, type, date } = data;
    const { name, text, changes } = content;

    const circleClass = cn("timeline-item-circle", `timeline-item-circle-${type ? type : "default"}`);

    return (
        <li className={`timeline-item timeline-item-${position}`} >
            <div className="timeline-item-tail"></div>
            <div className={circleClass} />
            <div className="timeline-item-content">
                {text} {changes} {name} {date}
            </div>
        </li >
    )
};

export default TimelineItem;