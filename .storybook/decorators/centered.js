import React from 'react'

const styles = {
  height: '100%',
  position: 'absolute',
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
}

export const Centered = storyFn => <div style={styles}>{storyFn()}</div>
