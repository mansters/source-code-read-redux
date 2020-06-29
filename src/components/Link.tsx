import React from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import { VisibilityFilterType } from '../actions/interface'
import { ConnectState } from '../interface'
import { Dispatch } from '@reduxjs/toolkit'

export interface ILinkConnectProps {
  filter: VisibilityFilterType;
}

export interface ILinkProps {
  active: boolean;
  onClick: () => void;
}

const Link: React.FC<ILinkProps> = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px'
    }}
  >
    {children}
  </button>
)



const mapStateToProps = (state: ConnectState, ownProps: ILinkConnectProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ILinkConnectProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Link) as React.FC<ILinkConnectProps>;