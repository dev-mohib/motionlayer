import React from 'react'
import { useAppSelector } from '@/state/hooks'
const Index = () => {
  const { layers } = useAppSelector(s => s.editorReducer)
  return (
    <div>
      {
        layers.map(l => <img key={l.index} src={l.url} alt={l.name} />)
      }
    </div>
  )
}

export default Index