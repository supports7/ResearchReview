const axios = require('axios')
console.log("opening gatsby-node")

async function getWeathers() {
    let responseData = await axios.get('https://sonova.s05.system7.co.nz/api/weatherforecast').then(
      (response) => {
        console.log("node data",response.data);
        return response.data;
    })
    console.log("node data 2",responseData);
    return responseData;
}

exports.createPages = async ({ actions: { createPage } }) => {
  // `getPokemonData` is a function that fetches our data
  var weathers = await getWeathers();
  console.log("weathers:",weathers)

  weathers.forEach(weather => { 
    console.log('gatsby-node weathers for each:', weather)
    createPage({
      path: `/dates/${weather.TemperatureF}.js`,
      component: require.resolve("./src/pages/Weather.Template.js"),
      context: { weather },
    })
  })
}