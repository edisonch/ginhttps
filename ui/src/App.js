import React, { Component } from "react";
import {Button, ButtonToolbar} from "reactstrap";

const URL = "http://localhost:3030/api/";

class App extends Component {
  handleButton = (e) => {
    console.log('handle button:', e.target);
    const token = authHeader();
    // const agent = new https.Agent({
    //   rejectUnauthorized: false
    // });
    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    return fetch(URL + `${e.target.name}`, {headers: token})
      .then(response => response.json().then(data => ({ status: response.status, data: data })))
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.log(error.toString());
        return error.toString();
      })
        .finally(() => {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
        });
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div className="card__box">
            <ButtonToolbar>
              <Button color="primary" name="hello" onClick={this.handleButton}>Hello</Button>
              <Button color="primary" name="client" onClick={this.handleButton}>Client</Button>
            </ButtonToolbar>
          </div>
        </main>
      </div>
    );
  }
}

function authHeader() {
  let origin = 'http://localhost:3000';
  console.log('origin', origin);
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin', origin);
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

  return headers;
}

export default App;
