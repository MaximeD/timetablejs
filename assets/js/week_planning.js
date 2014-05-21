// Generated by CoffeeScript 1.7.1
(function() {
  var createPlanning, events, hourRange, tableTemplate, weekDays;

  weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  hourRange = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  $.fn.planning = function(options) {
    var events, _i, _ref, _ref1, _results;
    events = options.events;
    if (options.days) {
      weekDays = options.days;
    }
    if (options.timelapse) {
      hourRange = (function() {
        _results = [];
        for (var _i = _ref = options.timelapse.start, _ref1 = options.timelapse.end; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    }
    return createPlanning();
  };

  tableTemplate = "<table class=\"table table-bordered\">\n  <thead>\n  </thead>\n  <tbody>\n  </tbody>\n</table>";

  events = [
    {
      name: "Kung Fu",
      day: 0,
      start: "13:00",
      end: "15:30"
    }
  ];

  createPlanning = function() {
    var day, hour, index, name, planningNodes, table, tableBody, tableHead, _i, _j, _len, _len1, _results;
    planningNodes = $('#week_planning');
    planningNodes.html(tableTemplate);
    table = $(planningNodes, 'table');
    tableHead = table.find('thead');
    tableBody = table.find('tbody');
    tableHead = table.find('thead');
    tableHead.html('<tr class="day-names"><td></td></tr>');
    for (_i = 0, _len = weekDays.length; _i < _len; _i++) {
      day = weekDays[_i];
      tableHead.find('tr').append("<td class='text-center'>" + day + "</td>");
    }
    _results = [];
    for (_j = 0, _len1 = hourRange.length; _j < _len1; _j++) {
      hour = hourRange[_j];
      _results.push(tableBody.append("<tr class=\'hour hour-" + hour + "\'>\n  <td class='hour-name'>\n    " + hour + ":00\n  </td>\n  " + ((function() {
        var _k, _len2, _results1;
        _results1 = [];
        for (index = _k = 0, _len2 = weekDays.length; _k < _len2; index = ++_k) {
          name = weekDays[index];
          _results1.push("<td class=\'day-" + index + "\'> <div class='minute minute-30'>&nbsp;</div> <div class='minute minute-45'>&nbsp;</div> <div class='minute minute-00'>&nbsp;</div> <div class='minute minute-15'>&nbsp;</div> </td>");
        }
        return _results1;
      })()) + "\n</tr>"));
    }
    return _results;
  };

}).call(this);
