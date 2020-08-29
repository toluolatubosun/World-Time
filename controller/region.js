const axios = require('axios');

// Functions for formatting time
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getOrdinal = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
}

const timeExtension = (hour) => {
    if( hour >= 12 ){
        return 'PM';
    }else{
        return 'AM';
    }
}

const convertHour = (hour) => {
    return hour % 12 || 12 ;
}

const adjustMinutes = (minute) => {
    return minute <= 9 ? `0${minute}` : minute;
}

const mainFormatter = (datetime) => {
    var formatted_datetime = datetime.split(".")[0]

    var date = new Date(formatted_datetime);

    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    var formatted_date = `${day}${getOrdinal(day)} ${month} ${year}`;

    var hour = date.getHours();
    var minute = date.getMinutes();
    var formatted_time = `${convertHour(hour)}:${adjustMinutes(minute)} ${timeExtension(hour)}`;

    return {
        formatted_time,
        formatted_date
    }
}

// Main Controllers

const list_regions = (req, res) => {
    axios.get('https://worldtimeapi.org/api/timezone')
        .then((response) => {
            res.render('region.ejs', { title: 'Regions', regions: response.data });
        })
        .catch((error) => {
            console.log(error);
            res.status(503).render('503');
        });
}

const display_time_region = (req, res) => {
    var continent = req.params.continent;
    var region = req.params.region;

    axios.get(`https://worldtimeapi.org/api/timezone/${continent}/${region}`)
    .then((response) => {
        var datetime = response.data.datetime;
        var location = response.data.timezone;
        
        var formatted = mainFormatter(datetime);
        res.render('time', { title: `${continent}/${region}`, date: formatted.formatted_date, time: formatted.formatted_time, location })
        
    })
    .catch((error) => {
        console.log(error);
        res.status(404).render('404');
    })
}
    
const display_time_timestamp = (req, res) => {
    var timestamp = req.params.timestamp;

    axios.get(`https://worldtimeapi.org/api/timezone/${timestamp}`)
    .then((response) => {
        var datetime = response.data.datetime;
        var location = response.data.timezone;
        
        var formatted = mainFormatter(datetime);
        res.render('time', { title: timestamp,  date: formatted.formatted_date, time: formatted.formatted_time, location })
        
    })
    .catch((error) => {
        console.log(error);
        res.status(404).render('404');
    })
}

module.exports = {
    list_regions,
    display_time_region,
    display_time_timestamp
}