import React from 'react'

import HomeIcon from '@material-ui/icons/Home'
import AlertIcon from '@material-ui/icons/Warning'
import SubscriptionIcon from '@material-ui/icons/Terrain'
import EventIcon from '@material-ui/icons/EventAvailable'
import RouteFinderIcon from '@material-ui/icons/Directions'
import ContributorsIcon from '@material-ui/icons/PersonPin'
import AboutIcon from '@material-ui/icons/Info'
import FAQIcon from '@material-ui/icons/NotListedLocation'
import DonateIcon from '@material-ui/icons/Favorite'
import FeedbackIcon from '@material-ui/icons/Feedback'
import MyCragsIcon from '@material-ui/icons/Terrain'
import Map from '@material-ui/icons/Map'

export const getIcon = (index) => {
  switch(index){
    case 'Home':
      return <HomeIcon />
    case 'Alerts':
      return <AlertIcon />
    case 'Subscriptions':
      return <SubscriptionIcon />
    case 'Events':
     return <EventIcon />
    case 'Route Finder':
      return <RouteFinderIcon />
    case 'Contributors':
      return <ContributorsIcon />
    case 'About':
      return <AboutIcon />
    case 'FAQ':
      return <FAQIcon />
    case 'Donate':
      return <DonateIcon />
    case 'Send Feedback':
      return <FeedbackIcon />
    case 'My Crags':
      return <MyCragsIcon />
    case 'Map':
      return <Map />
    default:
      return null
  }
}