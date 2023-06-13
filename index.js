const { pick , reduce} = require('@laufire/utils/collection');
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

  const valueOf = pick(populations, "estimate2022");
  const maxValue = Math.max(...pick(populations, "estimate2022"));
  const minValue = Math.min(...pick(populations, "estimate2022"));
  
  return ({
    maxValue2022: maxValue,
    minValue2022: minValue,
    maxValueState2022 : populations.find((state)=> Number(state.estimate2022) === maxValue).state,
    minValueState2022 : populations.find((state)=> Number(state.estimate2022) === minValue).state,
    totalPopulation2022 : reduce(valueOf,(acc,cur) => acc+Number(cur),0)
  
  });
}

const main = async () => {
  const data = await csvToJson().fromFile('./populationData.csv');
  const populationList = data.map(getPopulationList);
  console.table(populationList);
  console.log(getMinMax(data)); 
  
};

main();