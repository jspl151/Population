const csvToJson = require('csvtojson');

const getDifference = (population) => population.estimate2022 - population.estimate2011

const getPercentage = (population) => 
getDifference(population)/(population.estimate2011)*100

const addFields = (population) => ({
  ...population,
  difference : getDifference(population),
  percentage : getPercentage(population)
});

const getMinMax = (population) => {
 // console.log(data);
const value = population.map(population=>population.estimate2022);
  console.log(value);
return ({
  maxValue : (Math.max(...value)),
  minValue : (Math.min(...value))
})
}

const main = async () => {
const data = await csvToJson().fromFile('./populationData.csv');
const listOfPopulation = data.map(addFields);
console.log(listOfPopulation);
console.log(getMinMax(data));
};

main();