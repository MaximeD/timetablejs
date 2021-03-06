// Generated by CoffeeScript 1.7.1
(function() {
  var Templates,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Timetable = (function() {
    function Timetable(node, options) {
      var _i, _ref, _ref1, _results;
      if (options == null) {
        options = {};
      }
      this.createPlanning = __bind(this.createPlanning, this);
      if (node == null) {
        throw new Error("Don't know on which DOM element calendar should be built");
      }
      this.node = $(node);
      this.weekDays = options.dayNames || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      this.hourRange = options.hourRange || [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
      this.events = options.events;
      if (options.timelapse) {
        this.hourRange = (function() {
          _results = [];
          for (var _i = _ref = options.timelapse.start, _ref1 = options.timelapse.end; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
      }
      this.table = null;
      this.cell = null;
      this.hiddenEvents = {};
      this.createPlanning();
      this.drawEvents(options['tooltip']);
      window.addEventListener('resize', (function(_this) {
        return function() {
          _this.getCellDimensions();
          _this.deleteEvents();
          return _this.drawEvents(options['tooltip']);
        };
      })(this));
    }

    Timetable.prototype.createPlanning = function() {
      var colMd, day, hour, tableBody, tableHead, weekDaysLength, _i, _j, _len, _len1, _ref, _ref1;
      this.node.html(Templates.table());
      this.table = $(this.node, 'table');
      tableHead = this.table.find('thead');
      tableBody = this.table.find('tbody');
      tableHead.html(Templates.tableHead());
      weekDaysLength = this.weekDays.length;
      colMd = Math.floor(12 / weekDaysLength);
      _ref = this.weekDays;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        day = _ref[_i];
        tableHead.find('tr').append(Templates.tableTh({
          colMd: colMd,
          day: day
        }));
      }
      _ref1 = this.hourRange;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        hour = _ref1[_j];
        tableBody.append(Templates.tableTr({
          hour: hour,
          days: this.weekDays
        }));
      }
      return this.getCellDimensions();
    };

    Timetable.prototype.getCellDimensions = function() {
      var td;
      td = this.table.find("tbody td.day-0").first();
      return this.cell = {
        height: td.height(),
        width: td.width()
      };
    };

    Timetable.prototype.drawEvents = function(tooltip) {
      var dayElement, endHour, endMinute, event, eventHeight, eventNode, hourElement, left, startHour, startMinute, time, top, _i, _len, _ref, _results;
      if (tooltip == null) {
        tooltip = true;
      }
      _ref = this.events;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        if (!this.hiddenEvents[event.id]) {
          _results.push((function() {
            var _j, _len1, _ref1, _ref2, _ref3, _results1;
            _ref1 = event.times;
            _results1 = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              time = _ref1[_j];
              _ref2 = time.start.split(':'), startHour = _ref2[0], startMinute = _ref2[1];
              _ref3 = time.end.split(':'), endHour = _ref3[0], endMinute = _ref3[1];
              hourElement = this.table.find("tr.hour-" + startHour);
              dayElement = this.table.find("td.day-" + time.day).first();
              top = hourElement.offset().top + this.cell.height - 1 - hourElement.offsetParent().offset().top;
              top += this.cell.height * (parseInt(startMinute) / 60);
              top -= this.cell.height / 2;
              left = dayElement.offset().left + 1 - dayElement.offsetParent().offset().left;
              eventNode = $(Templates.event({
                name: event.name,
                comment: event.comment,
                start: time.start,
                end: time.end
              }));
              eventHeight = 0;
              eventHeight += (parseInt(endHour) - parseInt(startHour)) * this.cell.height - 1;
              eventHeight += (((parseInt(endMinute) - parseInt(startMinute)) / 60) * 100) * (this.cell.height / 100) - 1;
              eventNode.css('top', "" + top + "px").css('left', "" + left + "px").css('background-color', event.color).width(this.cell.width + 1).height(eventHeight);
              if (tooltip) {
                eventNode.tooltip({
                  html: true,
                  trigger: 'hover',
                  title: Templates.eventTooltip({
                    name: event.name,
                    comment: event.comment,
                    other: event.other,
                    start: time.start,
                    end: time.end
                  })
                });
              }
              _results1.push(this.table.append(eventNode));
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Timetable.prototype.deleteEvents = function() {
      return this.table.find(".event").remove();
    };

    Timetable.prototype.toggleEvents = function(eventName) {
      this.hiddenEvents[eventName] = !this.hiddenEvents[eventName];
      this.deleteEvents();
      return this.drawEvents();
    };

    return Timetable;

  })();

  Templates = (function(_super) {
    __extends(Templates, _super);

    function Templates() {
      return Templates.__super__.constructor.apply(this, arguments);
    }

    Templates.table = _.template("<table class=\"table table-bordered\">\n  <thead>\n  </thead>\n  <tbody>\n  </tbody>\n</table>");

    Templates.tableHead = _.template('<tr class="day-names"><th class="col-md-1"></th></tr>');

    Templates.tableTh = _.template("<th class='col-md-<%= colMd %> text-center'><%= day %></th>");

    Templates.tableTr = _.template("<tr class=\"hour hour-<%= hour %>\">\n  <td class='hour-name'>\n    <%= hour %>:00\n  </td>\n  <% _.each( days, function( name, index ) { %>\n    <td class=\"day day-<%= index %>\">\n      <div>&nbsp;</div>\n      <div>&nbsp;</div>\n    </td>\n    <% }); %>\n</tr>");

    Templates.event = _.template("<div class='event'>\n  <div class='event-name'><%= name %></div>\n  <% if ( comment ) { %>\n    <div class='event-comment'><%= comment %></div>\n  <% } %>\n  <div class='event-duration'><%= start %>&nbsp;&ndash;&nbsp;<%= end %></div>\n</div>");

    Templates.eventTooltip = _.template("<div>\n  <div><b><%= name %></b></div>\n  <% if ( comment ) { %>\n    <div><i><%= comment %></i></div>\n  <% } %>\n  <% if ( other ) { %>\n    <div><%= other %></div>\n  <% } %>\n  <div><%= start %>&nbsp;&ndash;&nbsp;<%= end %></div>\n</div>");

    return Templates;

  })(Timetable);

}).call(this);
