import React, { Component } from "react";
import api from "../../../services/api";
import SnackBar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/button";
import { IconButton } from "@material-ui/core";
import './styles.css'

export default class Target extends Component {
  state = {
    targetName: "",
    succeded: true
  };

  componentDidMount() {
    this.setState({
      succeded: false
    });
  }

  closeSnackbar = () => {
    this.setState({
      snackOpen: false
    });
  };

  setName = value => {
    this.setState({
      targetName: value
    });
  };

  handleSubmit = async event => {
    const { targetName } = this.state;
    const user_id = localStorage.getItem("user");

    event.preventDefault();

    if (!targetName) {
      this.setState({
        snackOpen: true,
        snackMessage: "É necessário informar o nome da pessoa"
      });

      return;
    }

    await api
      .post(
        "/targets",
        { name: targetName },
        {
          headers: { user_id }
        }
      )
      .then(event => {
        this.setState({
          succeded: true
        });
      })
      .catch(error => {
        this.setState({
          snackOpen: true,
          snackMessage: "Pessoa já cadastrada, favor verificar",
          succeded: false
        });
      });

    if (this.state.succeded) this.props.history.goBack();
  };

  cancelSubmit = () => {
    this.props.history.goBack();
  };

  render() {
    const { snackOpen, snackMessage } = this.state;

    return (
      <div className="container">
        <div className="content">
          <p>
            Cadastro de novos <strong>elementos:</strong>
          </p>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Nome *</label>
            <input
              type="text"
              id="name"
              placeholder="Nome da pessoa"
              onChange={event => this.setName(event.target.value)}
            />
            <div className="actions">
              <Button className="btn" type="submit">
                Cadastrar
              </Button>
              <Button className="btn" onClick={this.cancelSubmit}>
                Cancelar
              </Button>
            </div>
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
