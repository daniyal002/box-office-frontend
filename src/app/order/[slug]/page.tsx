import React from 'react'
import Order from './Order'


export default function page({ params }: { params: { slug: string } }) {
  return (
    <div className='container'><Order orderId={params.slug}/></div>
  )
}
