const config = require("../config/environment");

const moment = require("moment");

exports.send_response = function (
  data = {},
  is_error = false,
  message = "",
  status_code = 200
) {
  var json = {
    data: data,
    is_error: is_error,
    message: message,
    status_code: status_code,
  };
  if (is_error === undefined) {
    json.is_error = false;
  }
  if (message === undefined) {
    json.message = "";
  }

  return json;
};

exports.reverse_sort_model_data = function (data) {
  // reverse sort
  return data.sort(function (a, b) {
    return b.create_date - a.create_date;
  });
};

exports.reverse_array_data = function (data) {
  return data.reverse();
};

exports.renameObjectKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

exports.ms_to_str = (val) => {
  let tempTime = moment.duration(val),
    timeObj = {
      years: tempTime.years(),
      months: tempTime.months(),
      days: tempTime.days(),
      hrs: tempTime.hours(),
      mins: tempTime.minutes(),
      secs: tempTime.seconds(),
    },
    timeArr = [];

  for (let k in timeObj) {
    if (Number(timeObj[k]) > 0) {
      timeArr.push(`${timeObj[k]} ${k}`);
    }
  }

  return timeArr.join(", ");
};
