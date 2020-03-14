import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import api from "../../../services/api";
import Button from "@material-ui/core/button";
import "./styles.css";

export default class Depts extends React.Component {
  state = {
    depts: []
  };

  componentDidMount() {
    this.loadDeptsByUser();
  }

  loadDeptsByUser = async () => {
    const target_id = localStorage.getItem("target");

    const response = await api.get(`/targets/${target_id}/depts`);

    this.setState({
      depts: response.data
    });
  };

  navGoBack = () => {
    this.props.history.goBack();
  };

  deleteDept = async dept_id => {
    const target_id = localStorage.getItem("target");

    await api.delete(`/targets/${target_id}/depts/${dept_id}`);

    this.loadDeptsByUser();
  };

  render() {

    const { depts } = this.state;

    return (
      <div className="paperClass">
        <div className="actions">
          <Button onClick={this.navGoBack}>Voltar</Button>
        </div>
        <Paper className="root">
          <Table
            className="table"
            aria-label="simple table"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Descrição</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Data de Criação</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Valor</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Tipo de Pagamento</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Exclusão</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {depts.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell align="right">
                    <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">
                    {(row.value < 0 && <>Pagar</>) ||
                      (row.value >= 0 && <>Receber</>)}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => this.deleteDept(row._id)}>
                      Apagar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
