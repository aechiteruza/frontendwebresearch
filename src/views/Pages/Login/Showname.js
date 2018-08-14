import React, { Component } from 'react';
import DefaultHeader from '../../../containers/DefaultLayout/DefaultHeader'
class Showname extends Component{
    render() {
        return (
            <div>
                            <p className="text-muted"> Welcome : {this.props.details.firstname}  {this.props.details.lastname}</p>
                            <p className="text-muted"> Username :  {this.props.details.username} </p>
                            <p className="text-muted"> Email :  {this.props.details.email} </p>
            </div>
            
        )
    }
}

export default Showname;