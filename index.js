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
    difference: difference.toFixed(2),
    percentage: getPercentage(population, difference).toFixed(2)
  });

}

const getState = (populations , minMaxValues) =>  populations.find((state)=> Number(state.estimate2022) === minMaxValues).state;
  
const getMinMax = (populations) => {

  const valueOfEstimate2022 = pick(populations, "estimate2022");
  const maxValue = Math.max(...pick(populations, "estimate2022"));
  const minValue = Math.min(...pick(populations, "estimate2022"));
  
  return ({
    maxValue2022: maxValue,
    minValue2022: minValue,
    maxValueState2022 : getState(populations,maxValue),
    minValueState2022 : getState(populations,minValue),
    totalPopulation2022 : reduce(valueOfEstimate2022,(acc,cur) => acc+Number(cur),0)
  
  });
}

const main = async () => {
  const data = await csvToJson().fromFile('./populationData.csv');
  const populationList = data.map(getPopulationList);
  const minMaxValues = getMinMax(data);
  console.table(populationList);
  console.log(minMaxValues); 
  
};

main();