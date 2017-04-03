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


    componentWillMount() {
        console.log("Component will mount");
    }

    componentDidMount() {
        console.log("Component did mount!");
    }

    componentWillReceiveProps(nextProps) {
        console.log("Component will receive props", nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should Component update", nextProps, nextState);
        // if (nextState.status === 1) {
        //     return false;
        // }
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("Component will update", nextProps, nextState);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Component did update", prevProps, prevState);
    }

    componentWillUnmount() {
        console.log("Component will unmount");
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
