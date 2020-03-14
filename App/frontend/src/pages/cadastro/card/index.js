import React, { Component } from "react";
import SnackBar from "@material-ui/core/Snackbar";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import api from "../../../services/api";

export default class NewCard extends Component {
  state = {
    snackOpen: false,
    snackMessage: null,
    cardBank: "Others",
    cardDescription: null,
    cardLimit: null
  };

  handleChange = event => {
    this.setState({
      cardBank: event.target.value
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackOpen: false
    });
  };

  setDescription = value => {
    this.setState({
      cardDescription: value
    });
  };

  setLimit = value => {
    this.setState({
      cardLimit: value
    });
  };

  handleSubmit = async event => {
    const user_id = localStorage.getItem("user");
    const { cardDescription, cardLimit, cardBank } = this.state;

    event.preventDefault();

    if (!cardDescription) {
      this.setState({
        snackOpen: true,
        snackMessage: "Informe uma descrição"
      });

      return;
    }

    if (!cardLimit || cardLimit === 0) {
      this.setState({
        snackOpen: true,
        snackMessage: "Informe o limite do cartão"
      });

      return;
    }

    await api
      .post(
        "/cards",
        {
          description: cardDescription,
          limit: cardLimit,
          cardBank: cardBank
        },
        {
          headers: {
            user_id
          }
        }
      )
      .catch(error => {
        this.setState({
          snackOpen: true,
          snackMessage: "Erro ao cadastrar cartão"
        });
      });

    this.props.history.goBack();
  };

  cancelSubmit = () => {
    this.props.history.goBack();
  };

  render() {
    const { snackOpen, snackMessage, cardBank } = this.state;

    return (
      <div className="container">
        <div className="content">
          <p>
            Cadastre um novo cartão de crédito para o seu{" "}
            <strong>Controle</strong>
          </p>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="description">Descrição *</label>
            <input
              type="text"
              id="description"
              placeholder="Descrição do Cartão"
              onChange={event => this.setDescription(event.target.value)}
            />
            <label htmlFor="limit">Limite *</label>
            <input
              type="number"
              id="limit"
              step="0.01"
              placeholder="Valor do limíte"
              onChange={event => this.setLimit(event.target.value)}
            />
            <label htmlFor="bank">Banco *</label>
            <Select
              value={cardBank}
              onChange={this.handleChange}
              displayEmpty
              name="Banco"
              className="SelectField"
            >
              <MenuItem value="Nubank">Nubank</MenuItem>
              <MenuItem value="Caixa">Caixa</MenuItem>
              <MenuItem value="Others">Outros</MenuItem>
            </Select>
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
