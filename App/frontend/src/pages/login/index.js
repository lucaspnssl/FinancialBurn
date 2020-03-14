import React, { Component } from "react";
import api from "../../services/api";
import SnackBar from "@material-ui/core/Snackbar";
import { IconButton } from "@material-ui/core";
import "./styles.css";
import logo from '../../assets/logo.png';
 
export default class Login extends Component {
  state = {
    email: "",
    nickname: "",
    snackOpen: false,
    snackMessage: ""
  };

  handleSubmit = async (event) => {
    const { email, nickname } = this.state;

    event.preventDefault();

    if (!email) {
      this.setState({
        snackOpen: true,
        snackMessage: "É necessário informar um e-mail"
      });

      return;
    } else if (!nickname) {
      this.setState({
        snackOpen: true,
        snackMessage: "É necessário informar um apelido"
      });

      return;
    }

    const response = await api.post("/sessions", { email, nickname });
    
    const { _id } = response.data;

    localStorage.setItem('user', _id);

    this.props.history.push('menu');
  };

  setEmail = value => {
    this.setState({
      email: value
    });
  };

  setNickname = value => {
    this.setState({
      nickname: value
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackOpen: false
    });
  };

  render() {
    const { snackOpen, snackMessage } = this.state;

    return (
      <div className="container">
        <img src={logo} alt="FinancialBurn" />
        <div className="content">
          <p>
            Controle suas contas de forma <strong>rápida</strong> {" "}
            e <strong>prática</strong>
          </p>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">E-mail *</label>
            <input
              type="email"
              id="email"
              placeholder="Seu melhor e-mail"
              onChange={event => this.setEmail(event.target.value)}
            />
            <label htmlFor="nickname">Nickname *</label>
            <input
              type="text"
              id="nickname"
              placeholder="Seu Apelido"
              onChange={event => this.setNickname(event.target.value)}
            />
            <button className="btn" type="submit">
              Entrar
            </button>
          </form>

          <SnackBar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={this.closeSnackbar}
            message={<span id="message-id"> {snackMessage} </span>}
            action={[
              <IconButton
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.closeSnackbar}
              >
                x
              </IconButton>
            ]}
          />
        </div>
      </div>
    );
  }
}
