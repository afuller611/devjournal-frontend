import React from 'react'
import { Grid } from '@material-ui/core'

interface ContentAreaProps {
  children: any
}

const ContentArea: React.FC<ContentAreaProps> = ({ children }) => (
  <Grid container justify="center">
    <Grid item xs={11} sm={8}>
      {children}
    </Grid>
  </Grid>
)

export default ContentArea
