'use client'

import { Common, View } from '@/components/canvas/View'
import { AcousticGuitar } from './AcousticGuitar'

export function SongSparkHero() {
  return (
    <View className='h-full w-full'>
      <AcousticGuitar />
      <Common />
    </View>
  )
}
