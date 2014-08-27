# Timetable

`Timetable` is a simple javascript plugin to create weekly plannings.

## Dependencies

* Boostrap 3
* jquery
* underscorejs

## Usage

Create a `DOM` element with an id on which you wish the timetable to be inserted.
Create a script with the following:

```
$( document ).ready(function() {
  myTimetable = new Timetable( '#node_id', {
    timelapse:  {
      start:  08,
      end:    20
    },
    events: [
      // hashes of events
    ]
  }
}
```

Events should be an array where each event has the following form:

```
{
  name:     "name of your event",
  comment:  "an optional comment",
  other:    "optional other informations that will only be displayed in tooltip",
  id:       "uniq identifier, can be a string",
  color:    "the color you wish your event to be displayed",
  times:  [                                     // array of time where event is repeated
    {
      day:    "day number, starts from 0",
      start:  "starting time, format HH:MM",
      end:    "ending time, format HH:MM"
    },
    ...
  ]
},
...
```

[See it online](http://maximed.github.io/timetablejs/) for a working example.
