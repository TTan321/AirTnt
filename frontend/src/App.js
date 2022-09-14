import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import Spots from "./components/Spots/spots";
import UserSpots from "./components/AddSpot/index";
import EditSpot from './components/EditSpot/EditSpot';
import NoUserSpotDetails from "./components/SpotDetails/NoSessionUser";
import { getAllSpots } from './store/spotsReducer';
import LoginForm from "./components/LoginFormPage/index";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);

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
      <Navigation isLoaded={isLoaded} user={currentUser} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots spots={allSpotsArray} user={currentUser} />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/hostspot">
            <UserSpots />
          </Route>
          <Route exact path="/spots/:spotId">
            <NoUserSpotDetails />
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
