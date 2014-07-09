$( document ).ready(function() {
  timetable = new Timetable( '#timetable', {
    timelapse:  {
      start:  08,
      end:    20
    },
    events:     [
      {
        name:     "Coffee",
        comment:  "yum yum",
        id:       "coffee",
        color:    "#ae955a",
        times:  [
          {
            day:    "0",
            start:  "10:30",
            end:    "11:00"
          },
          {
            day:    "1",
            start:  "10:30",
            end:    "11:00"
          },
          {
            day:    "2",
            start:  "10:30",
            end:    "11:00"
          },
          {
            day:    "3",
            start:  "10:30",
            end:    "11:00"
          },
          {
            day:    "4",
            start:  "10:30",
            end:    "11:00"
          },
        ]
      },

      {
        name:     "Lunch Break",
        comment:  "time to eat!",
        id:       "lunch",
        color:    "#c982CE",
        times:  [
          {
            day:    "0",
            start:  "12:00",
            end:    "14:00"
          },
          {
            day:    "1",
            start:  "12:30",
            end:    "14:00"
          },
          {
            day:    "2",
            start:  "12:00",
            end:    "13:30"
          },
          {
            day:    "3",
            start:  "12:15",
            end:    "14:00"
          },
          {
            day:    "4",
            start:  "12:30",
            end:    "15:00"
          },
        ]
      },

      {
        name:     "Reading",
        id:       "reading",
        color:    "#65a593",
        times:  [
          {
            day:    "0",
            start:  "8:00",
            end:    "9:45"
          },
          {
            day:    "2",
            start:  "15:10",
            end:    "18:00"
          },
        ]
      },

      {
        name:     "Sport",
        id:       "sport",
        color:    "#9da957",
        times:  [
          {
            day:    "4",
            start:  "15:15",
            end:    "17:30"
          },
          {
            day:    "1",
            start:  "15:10",
            end:    "18:00"
          },
        ]
      },
    ]
  });
});
