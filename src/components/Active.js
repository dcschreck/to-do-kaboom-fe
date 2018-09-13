import React, { Component } from 'react';
import Item from './Item.js';

class Active extends Component {
    render() {
        return (
            <section className="active">
                This is your active todo page
                <Item firebase={this.props.firebase} isActive={true}/>
            </section>
        );
    }
}

export default Active;
