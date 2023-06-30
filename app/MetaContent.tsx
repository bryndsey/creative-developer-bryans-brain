'use client'
import { primaryTextColor, secondaryTextColor } from './colors'

export function MetaContent() {
  return (
    <div
      className='cursor-none rounded-xl bg-white/60 p-8 [box-shadow:0_0_25px_25px_rgba(255,255,255,0.6)]'
      data-cursor-exclusion
    >
      <p className='text-4xl'>Made by</p>
      <div className='text-9xl font-extrabold leading-none' style={{ color: primaryTextColor }}>
        <p>
          <span className='line-through opacity-70' style={{ color: secondaryTextColor }}>
            BRAIN
          </span>
          <br />
          <span className='line-through opacity-70' style={{ color: secondaryTextColor }}>
            BRIAN
          </span>
          <br />
          <span className='leading-none'>BRYAN</span>
        </p>
        {/* This value is chosen for the ratio of size between first and last name, assuming monospace */}
        <p className='text-[0.71em] leading-none'>LINDSEY</p>
      </div>
    </div>
  )
}
