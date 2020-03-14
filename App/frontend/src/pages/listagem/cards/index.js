import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import NuLogo from "../../../assets/nubank.png";
import CaixaLogo from "../../../assets/caixa.jpg";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GenericLogo from "../../../assets/creditGeneric.jpg";
import SnackBar from "@material-ui/core/Snackbar";
import { IconButton } from "@material-ui/core";
import api from "../../../services/api";

import "./styles.css";

export default class Cards extends Component {
  state = {
    cards: [],
    newValue: null,
    newLimit: null,
    openDialog: false,
    openDialogLimit: false,
    cardDialogId: null,
    snackOpen: false,
    snackMessage: null
  };

  componentDidMount = () => {
    this.setState({
      cardDialogId: null
    });

    this.loadCards();
  };

  loadCards = async () => {
    const user_id = localStorage.getItem("user");

    const response = await api.get("/cards", {
      headers: { user_id }
    });

    this.setState({
      cards: response.data
    });
  };

  deleteCard = async card_id => {
    await api.delete(`/cards/${card_id}`);

    this.loadCards();
  };

  getLogo = cardBank => {
    if (cardBank === "Nubank") {
      return NuLogo;
    } else if (cardBank === "Caixa") {
      return CaixaLogo;
    }

    return GenericLogo;
  };

  setOpenDialog = card_id => {
    this.setState({
      openDialog: true,
      cardDialogId: card_id,
      newValue: null
    });
  };

  setCloseDialog = () => {
    this.setState({
      openDialog: false,
      cardDialogId: null,
      newValue: null
    });
  };

  doUpdateActualValue = async () => {
    const { cardDialogId, newValue } = this.state;

    if (!newValue) {
      this.setState({
        snackOpen: true,
        snackMessage: "É necessário informar um valor para o campo"
      });

      return;
    }

    await api.put(`/cards/${cardDialogId}`, {
      actualValue: newValue
    });

    this.setState({
      newValue: null,
      openDialog: false,
      cardDialogId: null
    });

    this.loadCards();
  };

  doUpdateLimit = async () => {
    const { cardDialogId, newLimit } = this.state;

    if (!newLimit) {
      this.setState({
        snackOpen: true,
        snackMessage: "É necessário informar um valor para o campo"
      });

      return;
    }

    await api.put(`/cards/${cardDialogId}`, {
      limit: newLimit
    });

    this.setState({
      newLimit: null,
      openDialogLimit: false,
      cardDialogId: null
    });

    this.loadCards();
  };

  setNewValue = value => {
    this.setState({
      newValue: value
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackOpen: false,
      snackMessage: null
    });
  };

  setOpenDialogLimit = card_id => {
    this.setState({
      openDialogLimit: true,
      cardDialogId: card_id,
      newLimit: null
    });
  };

  setCloseDialogLimit = () => {
    this.setState({
      openDialogLimit: false,
      cardDialogId: null,
      newLimit: null
    });
  };

  setNewLimit = value => {
    this.setState({
      newLimit: value
    });
  };

  renderDialogLimit = () => {
    const { openDialogLimit } = this.state;

    return (
      <div>
        <Dialog open={openDialogLimit} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Limite</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Informe o valor atualizado do limite de crédito deste cartão
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="value"
              label="Valor atual"
              type="number"
              fullWidth
              onChange={event => this.setNewLimit(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.setCloseDialogLimit}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.doUpdateLimit}>
              Atualizar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  renderDialog = () => {
    const { openDialog } = this.state;

    return (
      <div>
        <Dialog open={openDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Fatura</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Informe o valor atualizado da fatura deste cartão
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="value"
              label="Valor atual"
              type="number"
              fullWidth
              onChange={event => this.setNewValue(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.setCloseDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.doUpdateActualValue}>
              Atualizar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  renderSnackBar = () => {
    const { snackOpen, snackMessage } = this.state;

    return (
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
    );
  };

  navGoBack = () => {
    this.props.history.goBack();
  };

  navNewCard = () => {
    this.props.history.push("/menu/cadastro/card");
  };

  render() {
    const { cards } = this.state;

    return (
      <div className="cardComponent">
        <Button className="navButtons" onClick={this.navGoBack}>
          Voltar
        </Button>
        <Button className="navButtons" onClick={this.navNewCard}>
          Novo
        </Button>

        <div className="listCards">
          {cards.map((row, i) => (
            <Card className="cards" key={i}>
              <CardActionArea onClick={() => this.setOpenDialog(row._id)}>
                {(this.getLogo(row.cardBank) === NuLogo && (
                  <CardMedia
                    className="cardsMedia"
                    image={NuLogo}
                    title="Cards"
                  />
                )) ||
                  (this.getLogo(row.cardBank) === CaixaLogo && (
                    <CardMedia
                      className="cardsMedia"
                      image={CaixaLogo}
                      title="Cards"
                    />
                  )) ||
                  (this.getLogo(row.cardBank) === GenericLogo && (
                    <CardMedia
                      className="cardsMedia"
                      image={GenericLogo}
                      title="Cards"
                    />
                  ))}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className = "Descricao">
                    {row.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Limite: {row.limit}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Valor atual: {row.actualValue}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Inicio: <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="actionButtons">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.deleteCard(row._id)}
                  >
                    Excluir
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.setOpenDialogLimit(row._id)}
                  >
                    Ajustar Limite
                  </Button>
              </CardActions>
            </Card>
          ))}
          {this.renderDialog()}
          {this.renderDialogLimit()}
          {this.renderSnackBar()}
        </div>
      </div>
    );
  }
}
