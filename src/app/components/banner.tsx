import Image from 'next/image'
import React from 'react'
import bannerQuebrado from './../../../public/banner-quebrado.png'

export default function Banner() {
  return (
    <Image
        src={bannerQuebrado}
        alt={'A broken image icon centered on a white background, featuring integrated electronic circuit traces extending from all four sides. The central icon and circuits are rendered in a soft purple-to-blue gradient. Surrounding the main icon are various floating elements, including yellow warning signs with black exclamation marks, smaller broken file symbols, and rounded L-shaped arrows pointing in different directions.'}
        sizes="100vw"
        className="rounded-xl object-cover"
    />
  )
}
