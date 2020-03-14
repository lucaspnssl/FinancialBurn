import React from "react";
import { Route } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

import Dashboard from "../dashboard";
import Target from "../cadastro/target";
import DeptList from "../listagem/depts";
import Dept from '../cadastro/dept';
import Cards from '../listagem/cards';
import NewCard from '../cadastro/card';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    fontSize: 30
  },
  appbar: {
    background: "darkviolet"
  },
  button: {
    background: "white",
    color: "darkviolet"
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: "darkviolet",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const DashMenu = ({ history }) => {
  const classes = useStyles();

  function navDashboard() {
    history.push("/menu/dashboard");
  }

  function navNewTarget() {
    history.push('/menu/cadastro/target');
  }

  function navLogOut() {
    history.push('../');
  }

  function navBankData() {
    history.push('/menu/listagem/cards');
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderStyledMenu = () => {
    return (
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          Open Menu
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemText primary="Pessoas" onClick={navDashboard}/>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemText primary="Adicionar Pessoa" onClick={navNewTarget}/>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemText primary="Dados de Bancos" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemText primary="Cartões de Crédito"  onClick={navBankData}/>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemText primary="Resumo Geral" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemText secondary="Sair" onClick={navLogOut}/>
          </StyledMenuItem>
        </StyledMenu>
      </div>
    );
  }

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={navDashboard}>
            FinancialBurn
          </Typography>
          {renderStyledMenu()}
        </Toolbar>
      </AppBar>
      <div>
        <Route path="/menu/dashboard" component={Dashboard} />
        <Route path="/menu/cadastro/target" component={Target} />
        <Route path="/menu/cadastro/dept" component={Dept} />
        <Route path="/menu/cadastro/card" component={NewCard} />
        <Route path="/menu/listagem/depts" component={DeptList} />
        <Route path="/menu/listagem/cards" component={Cards} />
      </div>
    </div>
  );
};

export default DashMenu;
