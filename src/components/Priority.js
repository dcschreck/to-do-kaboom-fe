import React, { Component } from 'react';

class Priority extends Component {
    constructor() {
        super();
        this.state = {
            showPriority: false
        }
        this.showPriority = this.showPriority.bind(this);
        this.closePriority = this.closePriority.bind(this);
    }

    showPriority(event) {
        event.preventDefault();
        this.setState({ showPriority: true }, () => {
            document.addEventListener('click', this.closePriority);
        });
    }

    closePriority(event) {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showPriority: false }, () => {
                document.removeEventListener('click', this.closePriority);
            });
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.showPriority}>
                    Priority
                </button>
                {
                    this.state.showPriority
                        ? (
                            <div
                                className="menu"
                                ref={(element) => {
                                this.dropdownMenu = element;
                                }}
                            >
                                <button> High </button>
                                <button> Medium </button>
                                <button> Low </button>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
        );
    }
}

export default Priority;
