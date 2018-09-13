import React, { Component } from 'react';
import Item from './Item.js';

class Historical extends Component {
    render() {
        return (
            <section className="historical">
                Historical to-dos will go here
                <Item firebase={this.props.firebase} isActive={false}/>
            </section>
        );
    }
}

export default Historical;
