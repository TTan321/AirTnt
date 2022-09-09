import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots/spots";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import AddSpotForm from "./components/AddSpot/AddSpotForm";
import UserSpots from "./components/AddSpot/index";
import EditSpot from './components/EditSpot/EditSpot';
import { getAllSpots } from './store/spotsReducer';

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const allSpots = useSelector((state) => (state.spots));
  const allSpotsArray = Object.values(allSpots);

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots spots={allSpotsArray} />
          </Route>
          <Route exact path="/hostspot">
            <UserSpots />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
