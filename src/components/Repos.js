import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  //console.log(repos);

  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total; //if language == null, then not get it
    //console.log(language);

    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {});

  //pie, most used languages
  const mostUsed = Object.values(languages) //convert to array and get only 5 data highest
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  //donut, most poplular languages
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    }) //flip stars to become item property
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  //console.log(languages);

  //stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  //console.log(stars, forks);

  // STEP 2 - Chart Data
  const chartData = [
    {
      label: 'HTML',
      value: '15',
    },
    {
      label: 'CSS',
      value: '23',
    },
    {
      label: 'Javascript',
      value: '30',
    },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />

        {/* <ExampleChart dataProp={chartData} /> */}
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
