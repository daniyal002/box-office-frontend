import React from 'react'
import RouteEdit from './RouteEdit'

export default function page({params}:{params:{slug:string}}) {
  return (
    <div><RouteEdit routeId={params.slug}/></div>

  )
}
