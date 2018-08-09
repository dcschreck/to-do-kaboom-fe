import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newItemName:''
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
        this.setState({ newItemName: e.target.value })
    }

    createItem(e) {
        const newItem = this.state.newItemName;
        this.setState({ items: this.state.items.concat(newItem), newItemName: ''});
        this.itemsRef.push({
            name: newItem
        });
    }

    render() {
        return (
            <section>
                {this.state.items.map(item =>
                    <div key={item.key}>
                        {item.name}
                        <input type="checkbox" />
                    </div>
                )}
                <form onSubmit={ (e) => this.createItem(e) }>
                    <input type="text" value={ this.state.newItemName } onChange={ (e) => this.handleChange(e) }/>
                    <input type="submit"/>
                </form>
            </section>
        );
    }
}

export default Item;
