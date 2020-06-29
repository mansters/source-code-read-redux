import React from 'react'
import { VisibilityFilterType } from '../actions/interface'
import Link from './Link'

const Footer = () => (
  <div>
    <span>Show: </span>
    <Link filter={VisibilityFilterType.SHOW_ALL}>All</Link>
    <Link filter={VisibilityFilterType.SHOW_ACTIVE}>Active</Link>
    <Link filter={VisibilityFilterType.SHOW_COMPLETED}>Completed</Link>
  </div>
)

export default Footer
