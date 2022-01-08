// This is a Singelton's Pattern
(function () {
  const latitude = 38.871571;
  const longitude = -6.949143;

  $.ajax({
    type: 'GET',
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9f50a805aa0089a1edd1829a5db029f0`,
    dataType: 'jsonp',
  })
    .done(function (data) {
      console.log('Correct!');
      console.log(data);

      showData(data);
      showStadiumTemperature();
    })
    .fail(function () {
      console.log('Error!');
    })
    .always(function () {
      console.log('Complete!');
    });

  function showData(data) {
    // Imagen
    const url = `img/weather/${data.weather[0].icon}.png`;
    $('.img-weather').attr('src', url);

    let temperature = Math.round(data.main.temp);
    $('.temperature').html(temperature + '&#176;');

    $('.div-loading').fadeOut(200, function () {
      $('.div-info').fadeIn(200);
    });
  }

  function showStadiumTemperature() {
    $('.teams h3').click(function (event) {
      const team = event.target.innerHTML;
      console.log(team);
    });
  }
})();
