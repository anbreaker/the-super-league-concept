// This is a Singelton's Pattern
(function () {
  let infoTeam = {
    latitude: 45.477951,
    longitude: 9.12393,
    shield: 'acmilan_hero_logo.png',
    stadium: 'San Siro',
  };

  getWeather(infoTeam);

  function getWeather(infoTeam) {
    $.ajax({
      type: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${infoTeam.latitude}&lon=${infoTeam.longitude}&units=metric&appid=6d9f7b68a8432684ebd89e73f0435f64`,
      dataType: 'jsonp',
    })
      .done(function (data) {
        // console.log('Correct!');

        showData(data, infoTeam.shield, infoTeam.stadium);
        showStadiumTemperature();
        showLocationAndGoStadium(infoTeam);
      })
      .fail(function () {
        console.log('Error!');
      })
      .always(function () {
        // console.log('Updated weather information!');
      });
  }

  function showData(data, shield, stadium) {
    // Image weather
    const urlWeather = `img/weather/${data.weather[0].icon}.png`;
    $('.img-weather').attr('src', urlWeather);

    const urlTeam = `img/teams/${shield}`;
    $('.img-team').attr('src', urlTeam);

    $('.stadium').html(stadium);

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

  function showLocationAndGoStadium(infoTeam) {
    // only openstreetmap
    // const url = `https://www.openstreetmap.org/export/embed.html?bbox=${infoTeam.longitude}%2C${infoTeam.latitude}%2C${infoTeam.longitude}%2C${infoTeam.latitude}&amp;layer=mapnik&amp;marker=${infoTeam.latitude}%2C${infoTeam.longitude}`;
    // With partners XD

    const url = `https://www.stay22.com/embed/gm?aid=affiliateid&lat=${infoTeam.latitude}&lng=${infoTeam.longitude}`;
    $('.location-stadium').attr('src', url);

    const href = `https://www.openstreetmap.org/?mlat=${infoTeam.latitude}&amp;mlon=${infoTeam.longitude}#map=14/${infoTeam.latitude}/${infoTeam.longitude}`;
    $('.show-openstreetmap').attr('href', href);

    $('.stadium-name').html(infoTeam.stadium);
  }

  function getJsonTeams(team) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'https://raw.githubusercontent.com/anbreaker/the-super-league-concept/main/database/dbStadiumsGPS.json',
    })
      .done(function (data) {
        if (data) {
          // console.log('Json completed successfully!');

          const teamFound = data.filter(function (item) {
            return item.name === team;
          });

          infoTeam = {
            latitude: teamFound[0].latitude,
            longitude: teamFound[0].longitude,
            shield: teamFound[0].shield,
            stadium: teamFound[0].stadium,
          };

          getWeather(infoTeam);
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
