weekDays  = [ "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi" ]
hourRange = [ 7..19 ]
events    = []

table     = null
tableHead = null
tableBody = null
cell      = null

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
    [ startHour, startMinute  ] = event.start.split ':'
    [ endHour, endMinute      ] = event.end.split ':'
    top   = $("tr.hour-#{startHour}").offset().top + cell.height
    left  = $("td.day-#{event.day}").first().offset().left + 1

    eventNode = $( "<div class='event'>#{event.name}<br/>#{event.start} &ndash; #{event.end}</div>" )

    eventHeight = 0
    eventHeight += ( parseInt( endHour ) - parseInt( startHour ) ) * cell.height
    eventHeight += ( ( (parseInt(endMinute) - parseInt(startMinute) ) / 60 ) * 100 ) * ( cell.height / 100 )


    eventNode
      .css 'position',        'absolute'
      .css 'top',             "#{top}px"
      .css 'left',            "#{left}px"
      .css 'background-color', event.color
      .width  cell.width
      .height eventHeight

    table.append eventNode

