import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isCompleted: false,
            newItemContent:''
        };
        this.itemsRef = this.props.firebase.database().ref('items');
    }

    componentDidMount() {
        this.itemsRef.on('child_added', snapshot => {
            const item = snapshot.val();
            item.key = snapshot.key;
            this.setState({ items: this.state.items.concat( item ) });
        });
    }

    componentWillUnmount() {
        this.itemsRef.off('child_added');
    }

    handleChange(e) {
        this.setState({ newItemContent: e.target.value })
    }

    createItem(e) {
        e.preventDefault();
        const newItem = this.state.newItemContent;
        this.itemsRef.push({
            content: newItem,
            isCompleted: false
        })
        this.setState({ newItemContent: '' });
    }

    markComplete(item) {
        this.itemsRef.update({
            [item.key]: { isCompleted: !item.isCompleted, content: item.content }
        })
    }

    render() {
        return (
            <section>
                {this.state.items.map( (item, index) =>
                    <div key={ index }>
                        { item.content }
                        <input type="checkbox" onChange={ () => this.markComplete(item)} />
                    </div>
                )}
                <form onSubmit={ (e) => this.createItem(e) }>
                    <input type="text" value={ this.state.newItemContent } onChange={ (e) => this.handleChange(e) }/>
                    <input type="submit"/>
                </form>
            </section>
        );
    }
}

export default Item;
