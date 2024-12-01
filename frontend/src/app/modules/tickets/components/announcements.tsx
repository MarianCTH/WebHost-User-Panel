import React, {FC} from 'react'
import {
    Announcement,
} from '../../../../_metronic/partials/widgets'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../../_metronic/layout/components/Content'
import { useAnnouncementsData } from '../core/Tickets'

const Announcements: FC = () => {
    const announcements = useAnnouncementsData()
    return (
        <>
        <Toolbar />
        <Content>
            {announcements.map((announcement) => (
                <Announcement className='card-xxl-stretch mb-5 mb-xl-8' announcement={announcement} key={announcement.id}/>
            ))}
        </Content>
        </>
    )
}

export {Announcements}
