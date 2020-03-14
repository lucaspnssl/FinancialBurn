import React, { Component } from "react";
import api from "../../../services/api";
import SnackBar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/button";
import { IconButton } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "./styles.css";

export default class Dept extends Component {
  state = {
    deptDescription: "",
    deptValue: null,
    succeded: true,
    paymentType: true
  };

  setDesc = value => {
    this.setState({
      deptDescription: value
    });
  };

  setValue = value => {
    this.setState({
      deptValue: value
    });
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

  handleChange = event => {
    this.setState({
      paymentType: event.target.value
    });
  };

  handleSubmit = async event => {
    const target_id = localStorage.getItem("target");
    const { deptDescription, deptValue, paymentType } = this.state;

    event.preventDefault();

    if (!deptDescription) {
      this.setState({
        snackOpen: true,
        snackMessage: "Informe uma descrição para a dívida"
      });

      return;
    }

    if (!deptValue) {
      this.setState({
        snackOpen: true,
        snackMessage: "Informe um valor para a dívida"
      });

      return;
    }

    let FinalValue = deptValue;
    if (!paymentType) {
      FinalValue *= -1;
    }

    await api
      .post(`/targets/${target_id}/depts`, {
        value: FinalValue,
        description: deptDescription
      })
      .then(event => {
        this.setState({
          succeded: true
        });
      })
      .catch(error => {
        this.setState({
          snackOpen: true,
          snackMessage: "Dívida Inválida",
          succeded: false
        });
      });

    if (this.state.succeded) this.props.history.goBack();
  };

  cancelSubmit = () => {
    this.props.history.goBack();
  };

  render() {
    const { snackOpen, snackMessage, paymentType } = this.state;

    return (
      <div className="container">
        <div className="content">
          <p>
            Nova <strong>Dívida:</strong>
          </p>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="description">Descrição *</label>
            <input
              type="text"
              id="description"
              placeholder="Descrição"
              onChange={event => this.setDesc(event.target.value)}
            />
            <label htmlFor="rate">Valor *</label>
            <input
              type="number"
              id="rate"
              step="0.01"
              placeholder="Valor"
              onChange={event => this.setValue(event.target.value)}
            />
            <label htmlFor="payment">Pagar/Receber *</label>
            <Select
              value={paymentType}
              onChange={this.handleChange}
              displayEmpty
              name="Pagamento"
              className="SelectField"
            >
              <MenuItem value={true}>Receber</MenuItem>
              <MenuItem value={false}>Pagar</MenuItem>
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
