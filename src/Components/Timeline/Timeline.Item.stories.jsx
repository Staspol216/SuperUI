import { Timeline } from './Timeline';

export default {
    component: Timeline.Item,
    title: 'Timeline.Item',
    argTypes: {
        type: {
            control: {
                control: 'select',
                description: 'Event type',
                options: ['edit', 'create', 'add', 'delete', 'default'],
                table: {
                    defaultValue: 'default'
                }
            }
        }
    }
}

const Template = args => <Timeline><Timeline.Item {...args} /></Timeline>

export const Default = Template.bind({});

Default.args = {
    type: 'edit',
    children: 'Some event...'
}