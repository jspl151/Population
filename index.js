const { pick } = require('@laufire/utils/collection');
const { Console } = require('console');
const csvToJson = require('csvtojson');

const getDifference = (population) => population.estimate2022 - population.estimate2011

const getPercentage = (population, difference) =>
  difference / (population.estimate2011) * 100

const getPopulationList = (population) => {
  const difference = getDifference(population);

  return ({
    ...population,
    difference: difference,
    percentage: getPercentage(population, difference)
  });

}

const getMinMax = (populations) => {
  const maxValue = Math.max(...pick(populations, "estimate2022"));
  const minValue = Math.min(...pick(populations, "estimate2022"));
  
  return ({
    maxValue: maxValue,
    minValue: minValue,
    maxValueState : populations.find((state)=> Number(state.estimate2022) === maxValue).state,
    minValueState : populations.find((state)=> Number(state.estimate2022) === minValue).state,
  })
}

const main = async () => {
  const data = await csvToJson().fromFile('./populationData.csv');
  const populationList = data.map(getPopulationList);
  console.log(populationList);
  const minMaxValue = getMinMax(data);
  console.log(getMinMax(data));

};

main();