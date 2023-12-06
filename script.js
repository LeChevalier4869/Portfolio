fetch('country-by-languages.json')
  .then(response => response.json())
  .then(data => {
    // Extract country names and language data
    const countries = data.countries;
    const labels = countries.map(country => country.country);
    
    // Extract language data for each country
    const languagesData = countries.map(country => country.languages);

    // Create a line chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: Object.keys(languagesData[0]).map(language => {
          return {
            label: language,
            data: languagesData.map(country => country[language]),
            fill: false,
            borderColor: getRandomColor()
          };
        })
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to generate random color for each line
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}