import React from "react";
import {render} from "react-dom";

import {Header} from "./components/Header";
import {Home} from "./components/Home";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
          parentLink: "Parent-Link"
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Header parentLink={this.state.parentLink}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Home
                            string={"Foo"}
                            initialValue={0}
                            greet={this.onGreet}
                            changeLink={() => this.onChangeLinkName()}
                            initialLinkName={this.state.parentLink}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));
