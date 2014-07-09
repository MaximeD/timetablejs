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


[See it online](http://maximed.github.io/timetablejs/) for a working example.
