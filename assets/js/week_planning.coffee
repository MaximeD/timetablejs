weekDays  = [ "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi" ]
hourRange = [ 7..19 ]
events    = []

table      = null
tableHead  = null
tableBody  = null
cell       = null
hideEvents = {}

$.fn.planning = ( options ) ->
  events    = options.events
  weekDays  = options.days if options.days
  hourRange = [ options.timelapse.start..options.timelapse.end ] if options.timelapse

  createPlanning()
  drawEvents()

tableTemplate = """
<table class="table table-bordered">
  <thead>
  </thead>
  <tbody>
  </tbody>
</table>
"""

$.fn.toggleEvents = ( eventName ) ->
  hideEvents[ eventName ] = !hideEvents[ eventName ]
  $( ".event" ).remove()
  drawEvents()


createPlanning = ->
  planningNodes = $( '#week_planning' )

  # create table
  planningNodes.html tableTemplate
  table = $( planningNodes, 'table' )

  tableHead = table.find( 'thead' )
  tableBody = table.find( 'tbody' )

  tableHead = table.find( 'thead' )
  tableHead.html '<tr class="day-names"><th class="col-md-1"></th></tr>'

  # fill days
  weekDaysLength = weekDays.length
  colMd = Math.floor( 12 / weekDaysLength )
  for day in weekDays
    tableHead.find('tr').append "<th class='col-md-#{colMd} text-center'>#{day}</th>"

  # fill hours
  for hour in hourRange
    tableBody.append """
<tr class=\'hour hour-#{hour}\'>
  <td class='hour-name'>
    #{hour}:00
  </td>
  #{for name, index in weekDays
    "<td class=\'day day-#{index}\'>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </td>"}
</tr>
"""

  # get cell informations
  td = $("tbody td.day-0").first()
  cell =
    height: td.height()
    width:  td.width()

drawEvents = ->
  for event in events
    unless hideEvents[ event.name ]
      for time in event.times
        [ startHour, startMinute  ] = time.start.split ':'
        [ endHour, endMinute      ] = time.end.split ':'
        top   = $("tr.hour-#{startHour}").offset().top + cell.height - 1
        left  = $("td.day-#{time.day}").first().offset().left + 1

        eventNode = $( "<div class='event'><span class='event-name'>#{event.name}</span><br/>#{time.start} &ndash; #{time.end}</div>" )

        eventHeight = 0
        eventHeight += ( parseInt( endHour ) - parseInt( startHour ) ) * cell.height - 1
        eventHeight += ( ( (parseInt(endMinute) - parseInt(startMinute) ) / 60 ) * 100 ) * ( cell.height / 100 ) - 1


        eventNode
          .css 'top',             "#{top}px"
          .css 'left',            "#{left}px"
          .css 'background-color', event.color
          .width  cell.width + 1
          .height eventHeight

        table.append eventNode
