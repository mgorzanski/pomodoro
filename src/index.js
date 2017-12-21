import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           sessionRunning: false,
           breakRunning: false,
           timer: "25:00",
           minutes: 25,
           seconds: 0,
           interval: null,
        };
    }

    startSession() {
        if (!this.state.sessionRunning) {
            if (this.state.breakRunning) {
                this.stop();
                this.setState({breakRunning: !this.state.breakRunning});
            }
            this.setState({
                minutes: 25,
                seconds: 0,
                sessionRunning: !this.state.sessionRunning,
                interval: setInterval(() => this.updateTimer(), 1000),
            });
        }
    }

    startBreak() {
        if (!this.state.breakRunning) {
            if (this.state.sessionRunning) {
                this.stop();
                this.setState({sessionRunning: !this.state.sessionRunning});
            }
            this.setState({
                minutes: 5,
                seconds: 0,
                breakRunning: !this.state.breakRunning,
                interval: setInterval(() => this.updateTimer(), 1000),
            });
        }
    }

    updateTimer() {
        if (this.state.minutes === 0 && this.state.seconds === 0) {
            this.stop();
            let alarm = new Audio('/sounds/alarm.mp3');
            alarm.volume = 0.2;
            alarm.play();
        } else {
            if (this.state.seconds === 0) {
                this.setState({
                    minutes: this.state.minutes - 1,
                    seconds: 59,
                });
            } else {
                this.setState({seconds: this.state.seconds - 1})
            }
        }
    }

    stop() {
        if (this.state.sessionRunning || this.state.breakRunning) {
            clearInterval(this.state.interval);
            this.setState({
                sessionRunning: false,
                breakRunning: false,
            });
        }
    }

    render() {
        return (
            <div className="app">
                <h2 className="timer">
                    {this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes}
                    :
                    {this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds}
                </h2>
                <nav className="buttons-nav">
                    <ul className="buttons-menu">
                        <li onClick={() => this.startSession()}>Start session</li>
                        <li onClick={() => this.startBreak()}>Start break</li>
                        <li onClick={() => this.stop()}>Stop</li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
