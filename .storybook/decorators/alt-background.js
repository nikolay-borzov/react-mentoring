import React from 'react'

const styles = {
  height: '100%',
  position: 'absolute',
  width: '100%'
}

export const AltBackground = storyFn => (
  <div style={styles} className="alt-background">
    {storyFn()}
  </div>
)
