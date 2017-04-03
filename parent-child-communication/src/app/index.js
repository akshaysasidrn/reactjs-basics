import React from "react";
import {render} from "react-dom";

import {Header} from "./components/Header";
import {Home} from "./components/Home";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
          parentLink: "Parent-Link",
          homeMounted: true
        };
    }

    onGreet() {
        alert("Parent component says Hello!");
    }

    onChangeLinkName(childLink) {
        this.setState({
            parentLink: childLink
        });
    }

    onChangeHomeMounted() {
        this.setState({
            homeMounted: !this.state.homeMounted
        });
    }
    render() {
        let homeComponent = "";
        if (this.state.homeMounted) {
            homeComponent = (
                <Home
                    string={"Foo"}
                    initialValue={0}
                    greet={this.onGreet}
                    changeLink={this.onChangeLinkName.bind(this)}
                    initialLinkName={this.state.parentLink}
                />
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Header parentLink={this.state.parentLink}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        {homeComponent}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <button onClick={this.onChangeHomeMounted.bind(this)} className="btn btn-primary">Unmount/Mount Home Component</button>
                    </div>
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));
