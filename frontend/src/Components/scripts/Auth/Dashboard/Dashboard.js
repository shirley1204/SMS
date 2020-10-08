import React, { Component } from 'react'
import {connect} from 'react-redux'
import Drawer from '../../../reusuable/Drawer'
 class DashBoard extends Component {
   
 render() {
        const {user} = this.props.auth
        return (
            <Drawer>
            <div>
                {user.email}
                {user.id}
                
               
            </div>
            </Drawer>
        )
    }
}


function mapStateToProps (state)  {
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,{})(DashBoard)