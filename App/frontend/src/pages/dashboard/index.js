import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";
import Button from "@material-ui/core/button";

export default class Dashboard extends Component {
  state = {
    targets: [],
    actualPage: null,
    totalPages: null,
    pageLoading: true
  };

  componentDidMount() {
    this.loadTargets();
  }

  loadTargets = async (page = 1) => {
    const user_id = localStorage.getItem("user");
    const { actualPage } = this.state;
    this.setState({
      pageLoading: true
    });

    const response = await api.get(`/targets?page=${page}`, {
      headers: { user_id }
    });

    if (response.data.length > 0) {
      this.setState({
        targets: response.data,
        actualPage: response.data[0].actualPage,
        totalPages: response.data[0].totalPages
      });
    } else if (actualPage > 1) {
      this.loadTargets(actualPage - 1);
    } else {
      this.setState({
        targets: []
      });
    }

    this.setState({
      pageLoading: false
    });
  };

  nextPage = () => {
    const { actualPage, totalPages } = this.state;

    if (parseInt(actualPage) === totalPages) return;
    const pageNumber = parseInt(actualPage) + 1;

    this.loadTargets(pageNumber);
  };

  prevPage = () => {
    const { actualPage } = this.state;

    if (parseInt(actualPage) === 1) return;

    const pageNumber = parseInt(actualPage) - 1;

    this.loadTargets(pageNumber);
  };

  navDeptList = target_id => {
    localStorage.setItem("target", target_id);

    this.props.history.push("./listagem/depts");
  };

  navNewDept = target_id => {
    localStorage.setItem("target", target_id);

    this.props.history.push("./cadastro/dept");
  };

  deleteTarget = async target_id => {
    await api.delete(`/targets/${target_id}`);

    this.loadTargets(this.state.actualPage);
  };

  render() {
    const { targets, pageLoading } = this.state;

    return (
      <div className="target-list">
        <div className="form-list">
          {targets.map((element, i) => (
            <article key={i}>
              <div>
                <p>Elemento: </p>
                <h3>{element.target.name}</h3>
                <p>Valor Atual:</p>
                <h1>R$ {Number(element.totalValue).toFixed(2)}</h1>
              </div>
              <div className="columnEdit">
                <Button
                  className="btnList"
                  onClick={() => this.navDeptList(element.target._id)}
                >
                  Listar Dívidas
                </Button>
              </div>
              <div className="columnEdit">
                <Button
                  className="btnList"
                  onClick={() => this.navNewDept(element.target._id)}
                >
                  Adicionar
                </Button>
              </div>
              <div className="columnEdit">
                <Button
                  className="btnList"
                  onClick={() => this.deleteTarget(element.target._id)}
                >
                  Apagar
                </Button>
              </div>
            </article>
          ))}
        </div>
        {!pageLoading && (
          <div className="actions">
            <Button onClick={this.prevPage}>Anterior</Button>
            <Button onClick={this.nextPage}>Próxima</Button>
          </div>
        )}
      </div>
    );
  }
}
