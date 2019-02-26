import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      kafka_messages: [],
      platform_events: [],
      available_subscriptions: [],
      ws: null,
      websocket_status: 'Connecting...'
    }
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.start_connection();
  }

  add_message(message) {
    this.setState({
      platform_events: this.state.platform_events.concat([message])
    });
    this.forceUpdate();
  }

  websocket_error(event_name) {
    this.setState({
      websocket_status: event_name
    });
    this.forceUpdate();
    console.log(`Websocket: ${event_name}`);
    this.start_connection();
  };

  do_message(message) {
    // console.log("message: ", message.data);
    this.add_message(JSON.parse(message.data));
  }

  set_websocket_status(status) {
    this.setState({
      websocket_status: status
    });
    console.log(`Websocket: ${this.state.websocket_status}`);
  }

  start_connection() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    var websocket_url = `wss://${window.location.hostname}`;
    this.state.ws = new WebSocket(websocket_url);
    this.state.ws.onopen = function () {
      this.set_websocket_status('Connected');
      this.send([
        {
          event_name: "ChangeEvents"
        },{
          event_name: "Example_Event__e"
        }
      ]);
      console.log("Websocket: READY");
      setInterval(function() {
        console.log("stayin alive!");
        conn.send('{"ab":"cd"}');
      },50000);
    }.bind(this);
    this.state.ws.onerror = function (error) {
      this.websocket_error("ERROR!");
    }.bind(this);
    this.state.ws.onclose = function() {
      this.websocket_error("Connection Closed");
    }.bind(this);
    this.state.ws.onmessage = function (message) {
      this.do_message(message);
    }.bind(this);
  }

  replaykafka_messages = () => {
    console.log("this has not been built yet");
    // Get the passwords and store them in state
    // fetch('/api/kafka')
    //   .then(res => res.json())
    //   .then(kafka_messages => this.setState({ kafka_messages }));
  }

  replayplatform_events = () => {
    console.log("this has not been built yet");
    // Get the passwords and store them in state
    // fetch('/api/kafka')
    //   .then(res => res.json())
    //   .then(kafka_messages => this.setState({ kafka_messages }));
  }

  render() {
    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        <div className={"status " + (this.state.websocket_status === "Connected" ? "connected" : "not-connected")}>
          {this.state.websocket_status}
        </div>
        {this.state.platform_events && this.state.platform_events.length ? (
          <div>
            <h2>Platform Events</h2>
            <table>
              <colgroup />
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Replay ID</th>
                  <th scope="col">Record ID</th>
                  <th scope="col">Record Message</th>
                </tr>
              </thead>
              <tbody>
              {this.state.platform_events.map((event, index) =>
                <tr key={index}>
                  <td></td>
                  <td>{event.event.replayId}</td>
                  <td>{event.payload.Record_ID__c}</td>
                  <td>{event.payload.Record_Message__c}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h2>No platform events yet</h2>
          </div>
        )}
      </div>
    );
  }
}

export default App;
