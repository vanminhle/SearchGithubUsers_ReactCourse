import React, { useState, useEffect } from 'react';
//LOCAL DATA, BECAUSE GITHUB LIMIT REQUEST PER HOURS
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//Provider, Consumer - GithubContext.Provide

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [requests, setRequests] = useState(0);
  const [loading, setIsLoading] = useState(false);
  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        //then (data)
        console.log(data);
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          //throw an Error
        }
      })
      .catch((err) => console.error(err));
  };
  //error
  useEffect(() => {
    console.log('App Loaded');
    checkRequests();
  }, []);

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
