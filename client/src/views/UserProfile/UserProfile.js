import React, { useState } from "react";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";

import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Portis from '@portis/web3';
import Web3 from 'web3';

import avatar from "assets/img/faces/marc.jpg";
import { FormControl, TableBody, TableContainer, Table, TableHead, TableCell, TableRow } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';


const myPrivateEthereumNode = {
  nodeUrl: 'HTTP://127.0.0.1:7545',
  chainId: 1337,
};


const portis = new Portis('1f0f049d-c90d-4c72-85ac-1067a6d94ef6', myPrivateEthereumNode);
const web3 = new Web3(portis.provider);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = {

  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [ show, setHide ] = useState(false)
  const [ formData, setFormData ] = useState({
    name: "",
    contact: "",
    email: "",
  })

  function handleChange(event) {
    const { id, value } = event.target
    setFormData({ ...formData, [ id ]: value })
  }
  
  function handleSubmit(event) {
    setHide(true)
    web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);
    });
    event.preventDefault();
  }
  return (
    <div>
      <GridContainer>
        <GridItem>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>User Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      inputProps={{
                        onChange: (e) => handleChange(e),
                        type: "text"
                      }}
                      labelText="Full Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      inputProps={{
                        onChange: (e) => handleChange(e),
                        type: "tel"
                      }}
                      labelText="Contact"
                      id="contact"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      inputProps={{
                        onChange: (e) => handleChange(e),
                        type: "email"
                      }}
                      labelText="Email Address"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">Submit Profile</Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
        {
          show && <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>User</h6>
                <h4 className={classes.cardTitle}>{formData.name}</h4>
                <p className={classes.description}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell component="th" scope="row">
                            Contact
                        </StyledTableCell>
                          <StyledTableCell align="right">{formData.contact}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell component="th" scope="row">
                            Email Address
                        </StyledTableCell>
                          <StyledTableCell align="right">{formData.email}</StyledTableCell>

                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </p>

                <Button color="primary" round onClick={e => e.preventDefault()}>
                  Edit
              </Button>
              </CardBody>
            </Card>
          </GridItem>
        }
      </GridContainer>
    </div >
  );
}
