import React, { Fragment } from "react";
import {
  Box,
  withStyles,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  Hidden
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from 'react-i18next';
import Banner from '../../assets/images/home.jpg';
import About from '../../assets/images/about.jpg';
import Background from '../../assets/images/about.jpg';
import FullpageBanner from '../common/FullpageBanner';
// import axios from 'axios';
// import { withTranslation } from "react-i18next";
// import "../../i18n";

// component level styling
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  fitViewPort: {
    height: "100vh",
    width: "100vw",
    maxWidth: "100vw"
  },
  section: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20
  },
  fitPercentages: {
    width: "100%",
    height: "100%",
    maxWidth: "100vw"
  },
  button: {
    margin: theme.spacing(1),
  },
  float: {
    position: "relative",
    zIndex: 1,
    height: "100vh",
    width: "100vw",
    maxWidth: "100vw"
  },
  img: {
    width: "100vw"
  },
  paragraph: {
    margin: theme.spacing(2),
  },
  card: {
    position: "relative",
  },
  cardMedia: {
    height: "240px"
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    margin: "0 32px",
    marginBottom: "8px",
    color: "white",
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: "100px",
    backgroundImage: 'linear-gradient(to bottom, transparent, #AFAFAFAF)',
  },
}));
const cards = [{
  image: "#",
  title: "Graduates",
  link: "/graduates",
  caption: "Are you guys still in contact?",
}, {
  image: "../../assets/images/committee.jpg",
  title: "Be A Committee",
  link: "/committee",
  caption: "Learn more about 'Our Promise' & register now to get involve in the event preparation",
}, {
  image: "#",
  title: "About",
  link: "/about",
  caption: "Learn more about the story & motivation behind 'Our Promise'",
},
];

function Home() {
  // const [t, i18n] = useTranslation();
  const classes = useStyles();
  return (
    <div>
      <FullpageBanner caption="" background={Banner} />

      <Container className={classes.container}>
        <Box id="home-introduction" className={classes.section}>
        <Typography variant="h3" className={classes.paragraph}>
          6th June 2016
            </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae sapien pulvinar, finibus nisl eu, finibus justo. In pulvinar libero eu turpis ultricies commodo in in sem. Quisque dictum id nunc tempus tincidunt. Vestibulum ut turpis ac diam ultricies pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam iaculis eu mi sit amet suscipit. Praesent ut venenatis est. Duis dictum urna a ex gravida ornare et et turpis. Nam eu libero nec libero pretium commodo sed a mauris. Morbi sed molestie diam, id euismod est. Praesent massa tellus, laoreet ac venenatis nec, vestibulum ut sem. Praesent a odio risus. Donec convallis tellus porta, rhoncus purus eget, consequat magna. Ut aliquam interdum dolor, eu laoreet velit. Ut laoreet tempus dolor, laoreet mollis nisl feugiat at.
    </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            Aliquam semper fermentum arcu vel rhoncus. Nullam hendrerit magna a orci dapibus tempor. Proin sollicitudin, orci eu facilisis laoreet, ligula purus porta sapien, vel dictum augue purus id magna. Aliquam dapibus nibh nulla, nec tristique leo bibendum nec. Praesent aliquam sollicitudin magna, sit amet molestie nisi scelerisque ac. Nulla nec tempor risus. Aliquam non viverra ipsum. Aliquam tincidunt, lacus a tempor pulvinar, quam mauris porta diam, quis pellentesque lorem nisl et mauris. Vivamus sit amet placerat velit, et bibendum sapien. Suspendisse auctor purus nec lorem faucibus, vitae blandit purus vehicula. Nulla quis nisi diam.
    </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            In sollicitudin pellentesque mi, sit amet lobortis ex consequat vitae. Duis volutpat, libero vitae efficitur tincidunt, erat lectus porttitor tellus, a elementum eros lectus id quam. Vestibulum vestibulum est elit, at aliquet nisl dapibus nec. Maecenas maximus bibendum diam id convallis. Mauris ullamcorper leo ac ex dictum interdum. Vestibulum blandit dolor eget malesuada pretium. Praesent mauris dolor, aliquam eget nulla et, auctor consequat mi. Praesent at leo condimentum, ullamcorper ante nec, finibus odio. Phasellus nibh urna, sodales aliquam dolor eu, iaculis semper arcu. Nam lobortis id massa at iaculis. Curabitur mauris ligula, fringilla sit amet ipsum eu, bibendum semper lacus.
    </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            Vestibulum pretium lorem et posuere faucibus. Fusce ultricies mauris eros, non aliquet felis elementum in. Morbi vel interdum risus, a ullamcorper ipsum. Sed convallis egestas sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque gravida posuere blandit. Quisque est tortor, scelerisque quis quam eu, consectetur tempus enim. Phasellus ac luctus velit, vel ornare nibh.
    </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            Nam ut lectus sed eros interdum consequat a ac nulla. Etiam in purus quam. Nulla eget odio faucibus, gravida tortor quis, lobortis tellus. Aliquam feugiat, erat sed facilisis feugiat, leo est tincidunt augue, eget malesuada metus nulla et magna. Curabitur sed ullamcorper tellus, ut pharetra nunc. Morbi sed velit finibus, rhoncus lacus at, efficitur sapien. Nullam porta orci vel dolor consequat, id commodo est bibendum. Pellentesque semper lobortis eros eu egestas. Fusce porta venenatis justo. Proin ullamcorper scelerisque velit a vestibulum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In tincidunt ipsum ac dapibus laoreet. Proin eu porttitor neque. Phasellus ut cursus ante, eu ultrices lectus.
      </Typography>
          <Button className={classes.button} variant="contained" color="primary">
            Be A Committee
      </Button>
        </Box>
        <Box id="new">
          <Typography variant="h3" className={classes.paragraph}>
            What's new!
            </Typography>

          <ul>
            <li><Typography variant="subtitle1" className={classes.paragraph}>
            Nam ut lectus sed eros </Typography></li>
            <li><Typography variant="subtitle1" className={classes.paragraph}>
            Nam ut lectus sed eros </Typography></li>
            <li><Typography variant="subtitle1" className={classes.paragraph}>
            Nam ut lectus sed eros </Typography></li>
          </ul>
        </Box>

        <Box id="content-cards" className={classes.section}>
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <Grid item key={i} xs={12} md={6}>
                <Card>
                  <CardActionArea className={classes.card}>
                    <Link to={card.link}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={About}
                        title={card.title}
                      />
                      <div className={classes.overlay}></div>
                      <div className={classes.cardContent}>
                        <Typography gutterBottom variant="h5">
                          {card.title}
                        </Typography>
                      </div>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Home;
