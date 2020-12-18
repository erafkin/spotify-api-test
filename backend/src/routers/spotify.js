import { Router } from 'express';
// import * as Spotify from '../controllers/spotify';
import axios from 'axios';

const router = Router();

router.route('/top/:type/:accessToken')
  .get((req, res) => {
    axios.get(`https://api.spotify.com/v1/me/top/${req.params.type}`, { headers: { Authorization: `Bearer ${req.params.accessToken}` } })
      .then((response) => {
        res.send({ status: 200, error: null, response: response.data });
      })
      .catch((error) => {
        res.send({
          status: error.response.status,
          error: 'error getting top ',
          response: error.message,
        });
      });
  });

router.route('/player/:token')
  .get((req, res) => {
    axios.get('https://api.spotify.com/v1/me/player', { headers: { Authorization: `Bearer ${req.params.token}` } })
      .then((response) => {
        res.send({ status: 200, error: null, response: response.data });
      })
      .catch((error) => {
        res.send({
          status: error.response.status,
          error: 'error getting player ',
          response: error.message,
        });
      });
  });

export default router;
