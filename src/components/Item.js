import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newItemContent:''
        };
        this.itemsRef = this.props.firebase.database().ref('items');
    }

    componentDidMount() {
        this.itemsRef.on('child_added', snapshot => {
            const item = snapshot.val();
            item.key = snapshot.key;
            this.setState({ items: this.state.items.concat( item ) });
            console.log(snapshot.val());
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
        this.setState({ items: this.state.items.concat(newItem), newItemContent: ''});
        this.itemsRef.push({
            content: newItem,
        });
    }

    render() {
        return (
            <section>
                {this.state.items.map(item =>
                    <div key={ item.key }>
                        { item.content }
                        <input type="checkbox" />
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
