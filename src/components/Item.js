import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            todos: [],
            isCompleted: false,
            newItemContent:''
        };
        this.itemsRef = this.props.firebase.database().ref('items');
    }

    componentDidMount() {
        this.itemsRef.on('child_added', snapshot => {
            const item = snapshot.val();
            item.key = snapshot.key;
            this.setState({ items: this.state.items.concat( item ) }, () => {
                this.displayActive();
            });
        });
    }

    componentWillUnmount() {
        this.itemsRef.off('child_added');
    }

    handleChange(e) {
        this.setState({ newItemContent: e.target.value })
    }

    dateDiffInDays(a,b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        const timeRemaining = Math.floor((utc2 - utc1) / _MS_PER_DAY);
        return (7 - timeRemaining);
    }

    createItem(e) {
        e.preventDefault();
        const newItem = this.state.newItemContent;
        const createdDate = Date(this.props.firebase.database.ServerValue.TIMESTAMP);

        this.itemsRef.push({
            content: newItem,
            timeRemaining: this.dateDiffInDays(new Date(createdDate), new Date()),
            isCompleted: false,
            created: createdDate,
        })
        this.setState({ newItemContent: '' });
    }

    markComplete(item) {
        this.itemsRef.update({
            [item.key]: {
                isCompleted: !item.isCompleted,
                content: item.content,
                created: item.created
            }
        })
        this.displayActive();
    }

    displayActive() {
        if (this.props.isActive) {
            const activeItems = this.state.items.filter(item => (item.isCompleted === false && ((this.dateDiffInDays(new Date(item.created), new Date())) > 0)));
            this.setState({ todos: activeItems });
        } else {
            const completedItems = this.state.items.filter(item => (item.isCompleted === true || ((this.dateDiffInDays(new Date(item.created), new Date())) <= 0)));
            this.setState({ todos: completedItems });
        }
    }

    render() {
        return (
            <section>
                {this.state.todos.map( (item, index) =>
                    <div key={ index }>
                        { item.content }
                        { this.dateDiffInDays(new Date(item.created), new Date()) }
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
