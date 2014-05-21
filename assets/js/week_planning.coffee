weekDays  = [ "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi" ]
hourRange = [ 7..19 ]

$.fn.planning = ( options ) ->
  events    = options.events
  weekDays  = options.days if options.days
  hourRange = [ options.timelapse.start..options.timelapse.end ] if options.timelapse

  createPlanning()

tableTemplate = """
<table class="table table-bordered">
  <thead>
  </thead>
  <tbody>
  </tbody>
</table>
"""

events    = [
  { name: "Kung Fu", day: 0, start: "13:00", end: "15:30" }
]

createPlanning = ->
  planningNodes = $( '#week_planning' )

  # create table
  planningNodes.html tableTemplate
  table = $( planningNodes, 'table' )

  tableHead = table.find( 'thead' )
  tableBody = table.find( 'tbody' )

  tableHead = table.find( 'thead' )
  tableHead.html '<tr class="day-names"><td></td></tr>'
  for day in weekDays
    tableHead.find('tr').append "<td class='text-center'>#{day}</td>"

  for hour in hourRange
    tableBody.append """
<tr class=\'hour hour-#{hour}\'>
  <td class='hour-name'>
    #{hour}:00
  </td>
  #{for name, index in weekDays
    "<td class=\'day-#{index}\'>
      <div class='minute minute-30'>&nbsp;</div>
      <div class='minute minute-45'>&nbsp;</div>
      <div class='minute minute-00'>&nbsp;</div>
      <div class='minute minute-15'>&nbsp;</div>
    </td>"}
</tr>
"""

  # for event in events

