import React from "react";

export class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: props.initialValue,
            status: "Initialized status",
            parentLink: props.initialLinkName
        };
        setTimeout(() => {
            this.setState({
                status: "Changed status"
            });
        },3000);
    }

    incrementValue() {
        this.setState({
            value: this.state.value + 1
        });
    }

    onChangeLink() {
        this.props.changeLink(this.state.parentLink);
    }

    onHandleChange(event) {
        this.setState({
            parentLink: event.target.value
        });
    }

    render() {
        return (
            <div>
                <p>Home Component!</p>
                <p>String: {this.props.string} Value: {this.state.value}</p>
                <p>Status: {this.state.status}</p>
                <hr/>
                <button onClick={() => this.incrementValue()} className="btn btn-primary">Increment</button>
                <hr/>
                <button onClick={this.props.greet} className="btn btn-primary">Greet</button>
                <hr/>
                <input type="text" value={this.state.parentLink}
                       onChange={(event) => this.onHandleChange(event)} />
                <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change Header Link</button>
            </div>
        );
    }
}

Home.propTypes = {
    string: React.PropTypes.string,
    initialValue: React.PropTypes.number,
    greet: React.PropTypes.func,
    initialLinkName: React.PropTypes.string
};
