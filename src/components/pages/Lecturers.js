import React, { useState, useCallback, useEffect } from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from "@material-ui/styles/makeStyles";
import useTheme from '@material-ui/styles/useTheme';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Banner from '../common/Banner';
import CustomDialog from "../common/CustomDialog";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  section: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: `${theme.spacing(2)}px 0px`,
  },
  searchBar: {
    width: "96%",
    [theme.breakpoints.up('md')]: {
      width: "72%",
    }
  },
  advancedSearch: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  sortBy: {
    marginTop: theme.spacing(1),
  },
  card: {
    margin: "4px",
    width: "43.2vw",
    [theme.breakpoints.up('md')]: {
      width: "282px",
    }
  },
  cardMedia: {
    height: "28.8vw",
    [theme.breakpoints.up('md')]: {
      height: "188px",
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  cardContent: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    paddingBottom: `${theme.spacing(1)}px !important`,
  },
}));



function Lecturers() {

  const verified = useSelector(state => state.firebase.profile.verified);
  const uid = useSelector(state => state.firebase.auth.uid);
  const [lecturers, setLecturers] = useState({ data: null, ordered: null })

  useEffect(() => {
    let url = 'https://us-central1-ourpromise.cloudfunctions.net/api/lecturers'
    if (verified) {
      url += `?uid=${uid}`;
    }
    axios.get(url)
      .then(res => {
        //to perform value copy instead of reference copy for Array Object
        const lecturersData = res.data.slice();
        const lecturersOrdered = res.data.slice();
        setLecturers({ data: lecturersData, ordered: lecturersOrdered })
      })
      .catch(error => {
        console.log(error);
      });
  }, [verified, uid]);

  const searchAPI = (items, searchOptions) => filterItems(items, searchOptions);
  const searchAPIDebounced = useCallback(AwesomeDebouncePromise(searchAPI, 500), []);

  const handleChange = async text => {
    // setSearchTerm(text);
    let searchOptions = {
      searchTerm: text,
    };
    if (searchOptions.searchTerm) {
      if (lecturers.data) {
        const result = await searchAPIDebounced(lecturers.data, searchOptions);
        setLecturers({ ...lecturers, ordered: result })
        setSortBy({ label: "Sort By", value: "Default", ascending: true, anchorEl: null });
      }
    } else {
      setLecturers({ ...lecturers, ordered: lecturers.data })
    }
  };

  const filterItem = (item, searchOptions) => {
    if (
      Object.values(item).some(values => {
        return (values) ? values
          .toString()
          .toLowerCase()
          .includes(searchOptions.searchTerm.toLowerCase())
          :
          false
      }
      )
    ) {
      return item;
    } else {
      return null;
    }
  }

  const filterItems = (items, searchOptions) => {
    return items.reduce((accumulator, currentItem) => {
      const foundItem = filterItem(currentItem, searchOptions);
      if (foundItem) {
        accumulator.push(foundItem);
      }
      return accumulator;
    }, []);
  }

  const [dialog, setDialog] = useState(null);

  const [sortBy, setSortBy] = useState({ label: "Sort By", value: "Default", ascending: true, anchorEl: null });
  const handleSortByOpen = event => {
    setSortBy({ ...sortBy, anchorEl: event.currentTarget });
  };
  const handleSortByClose = (sortCriteria) => {
    if (sortCriteria === null) {
      //did not select anything
      setSortBy({ ...sortBy, anchorEl: null });
    } else if (sortCriteria === sortBy.value) {
      //select the same sortCriteria
      const sortedData = lecturers.data.reverse();
      const sortedOrdered = lecturers.ordered.reverse();
      setLecturers({ data: sortedData, ordered: sortedOrdered });
      setSortBy({ ...sortBy, ascending: !sortBy.ascending, anchorEl: null });
    } else {
      const sortedData = sortLecturers(lecturers.data, sortCriteria);
      const sortedOrdered = sortLecturers(lecturers.ordered, sortCriteria);
      setLecturers({ data: sortedData, ordered: sortedOrdered });
      setSortBy({ label: sortCriteria, value: sortCriteria, ascending: true, anchorEl: null })
    }
  }

  function sortLecturers(data, sortCriteria) {
    let fieldName = null;
    switch (sortCriteria) {
      case "Name":
        fieldName = 'name';
        break;
      case "Gender":
        fieldName = 'gender';
        break;
      case "Tutorial Group":
        fieldName = 'tutorial';
        break;
      case "Birthday":
        fieldName = 'birthday';
        break;
      case "Default":
      default:
        fieldName = 'id';
        break;
    }
    return data.sort((a, b) => {
      //if equal then comparison = 0
      let comparison = 0;
      if (a[fieldName] > b[fieldName]) {
        comparison = 1;
      } else if (b[fieldName] > a[fieldName]) {
        comparison = -1;
      }
      return comparison;
    })
  }

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <Container className={classes.container} >
        <Box id="lecturers-filterOption" className={classes.section}>
          <TextField className={classes.searchBar} label="Search" margin="normal" variant="outlined" onChange={(e) => { handleChange(e.currentTarget.value) }} />
          <Button className={classes.sortBy} aria-controls="lecturers-sortBy" aria-haspopup="true" onClick={handleSortByOpen}>
            {sortBy.label}
            {sortBy.ascending ? <ExpandMore /> : <ExpandLess />}
          </Button>
          <Menu
            id="lecturers-sortBy"
            anchorEl={sortBy.anchorEl}
            keepMounted
            open={Boolean(sortBy.anchorEl)}
            onClose={() => { handleSortByClose(null) }}
          >
            <MenuItem onClick={() => { handleSortByClose("Default") }}>Default</MenuItem>
            <MenuItem onClick={() => { handleSortByClose("Name") }}>Name</MenuItem>
            <MenuItem onClick={() => { handleSortByClose("Gender") }}>Gender</MenuItem>
            {verified ? <MenuItem onClick={() => { handleSortByClose("Birthday") }}>Birthday</MenuItem> : null}
            {verified ? <MenuItem onClick={() => { handleSortByClose("Tutorial Group") }}>Tutorial Group</MenuItem> : null}
          </Menu>
        </Box>
        <Box id="lecturers-images" className={classes.section}>
          {lecturers.ordered ?
            lecturers.ordered.map((lecturer, index) =>
              <Card key={lecturer.id} className={classes.card}>
                <CardActionArea>
                  <Link className={classes.link} to={`/lecturers/${lecturer.id}`}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={lecturer.image || null}
                      title={lecturer.name}
                    />
                  </Link>
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Typography variant="subtitle1">{lecturer.name_ch}</Typography>
                  <Typography variant={matches ? "subtitle1" : "body2"} component="div">{lecturer.name}</Typography>
                </CardContent>
              </Card>
            )
            :
            <CircularProgress />
          }
        </Box>
      </Container>
      {/* Display if advanced search button is clicked */}
      {dialog ?
        <CustomDialog
          open={Boolean(dialog)}
          onClose={() => { setDialog(null) }}
          title={dialog.title}
          description={dialog.description}
        />
        : null
      }
    </>
  );
}

export default Lecturers;
