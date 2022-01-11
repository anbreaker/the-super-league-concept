// Load DOM first
$(function () {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '../../database/dbStadiumsGPS.json',
  })
    .done(function (data, team) {
      team = null;

      if (data && team) {
        // TODO
        // console.log('Json completed successfully!');

        const found = data.filter(function (item, team) {
          return item.name === team;
        });

        console.log(found[0].name);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log('The application has failed: ' + textStatus);
    })
    .always(function () {
      // TODO
      // console.log('Complete!');
    });
});
