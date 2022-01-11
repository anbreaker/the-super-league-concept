// This is a Singelton's Pattern
(function () {
  const latitude = 38.871571;
  const longitude = -6.949143;
  const shield = 'acmilan_hero_logo.png';

  getWeather(latitude, longitude, shield);

  function getWeather(latitude, longitude, shield) {
    $.ajax({
      type: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9f50a805aa0089a1edd1829a5db029f0`,
      dataType: 'jsonp',
    })
      .done(function (data) {
        // console.log('Correct!');

        showData(data, shield);
        showStadiumTemperature();
      })
      .fail(function () {
        console.log('Error!');
      })
      .always(function () {
        // console.log('Updated weather information!');
      });
  }

  function showData(data, shield) {
    // Image weather
    const urlWeather = `img/weather/${data.weather[0].icon}.png`;
    $('.img-weather').attr('src', urlWeather);

    const urlTeam = `img/teams/${shield}`;
    $('.img-team').attr('src', urlTeam);

    $('.stadium').html(shield + '&#176;');

    const temperature = Math.round(data.main.temp);
    $('.temperature').html(temperature + '&#176;');

    $('.div-loading').fadeOut(200, function () {
      $('.div-info').fadeIn(200);
    });
  }

  function showStadiumTemperature() {
    $('.teams h3').click(function (event) {
      const team = event.target.innerHTML;

      getJsonTeams(team);
    });
  }

  function getJsonTeams(team) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '../../database/dbStadiumsGPS.json',
    })
      .done(function (data) {
        if (data) {
          // console.log('Json completed successfully!');

          const teamFound = data.filter(function (item) {
            return item.name === team;
          });

          getWeather(teamFound[0].latitude, teamFound[0].longitude, teamFound[0].shield);
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log('The application has failed: ' + textStatus);
      })
      .always(function () {
        // console.log('Complete!');
      });
  }
})();
