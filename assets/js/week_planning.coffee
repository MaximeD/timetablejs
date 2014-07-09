class window.WeekPlanning
  @_tableTemplate = """
  <table class="table table-bordered">
    <thead>
    </thead>
    <tbody>
    </tbody>
  </table>
  """

  constructor: ( node, options = {} ) ->
    unless node?
      throw new Error( "Don't know on which DOM element calendar should be built" )
    @node       = $( node )
    @weekDays   = options.weekDays || [ "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi" ]
    @hourRange  = options.hourRange || [ 7..19 ]
    @events     = options.events
    @hourRange  = [ options.timelapse.start..options.timelapse.end ] if options.timelapse

    @table        = null
    @cell         = null
    @hiddenEvents = {}

    # create calendar
    @createPlanning()
    @drawEvents()

    window.addEventListener 'resize', =>
      @getCellDimensions()
      @deleteEvents()
      @drawEvents()

  createPlanning: =>
    # create table
    @node.html WeekPlanning._tableTemplate
    @table = $( @node, 'table' )

    tableHead = @table.find( 'thead' )
    tableBody = @table.find( 'tbody' )

    tableHead.html '<tr class="day-names"><th class="col-md-1"></th></tr>'

    # fill days
    weekDaysLength = @weekDays.length
    colMd = Math.floor( 12 / weekDaysLength )
    for day in @weekDays
      tableHead.find('tr').append "<th class='col-md-#{colMd} text-center'>#{day}</th>"

    # fill hours
    for hour in @hourRange
      tableBody.append """
  <tr class=\'hour hour-#{hour}\'>
    <td class='hour-name'>
      #{hour}:00
    </td>
    #{for name, index in @weekDays
      "<td class=\'day day-#{index}\'>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </td>"}
  </tr>
  """

    @getCellDimensions()

  getCellDimensions: ->
    # get cell informations
    td = $("tbody td.day-0").first()
    @cell =
      height: td.height()
      width:  td.width()

  drawEvents: ->
    for event in @events
      unless @hiddenEvents[ event.id ]
        for time in event.times
          [ startHour, startMinute  ] = time.start.split ':'
          [ endHour, endMinute      ] = time.end.split ':'
          hourElement = $("tr.hour-#{startHour}")
          dayElement  = $("td.day-#{time.day}").first()
          top   = hourElement.offset().top + @cell.height - 1 - hourElement.offsetParent().offset().top
          left  = dayElement.offset().left + 1 - dayElement.offsetParent().offset().left

          eventHtml = "<div class='event'><div class='event-name'>#{event.name}</div>"
          eventHtml += "<div class='event-comment'>#{event.comment}</div>" if event.comment?
          eventHtml += "<div class='event-duration'>#{time.start} &ndash; #{time.end}</div></div>"
          eventNode = $( eventHtml )

          eventHeight = 0
          eventHeight += ( parseInt( endHour ) - parseInt( startHour ) ) * @cell.height - 1
          eventHeight += ( ( (parseInt(endMinute) - parseInt(startMinute) ) / 60 ) * 100 ) * ( @cell.height / 100 ) - 1

          eventNode
            .css 'top',             "#{top}px"
            .css 'left',            "#{left}px"
            .css 'background-color', event.color
            .width  @cell.width + 1
            .height eventHeight

          @table.append eventNode

  deleteEvents: ->
    $( ".event" ).remove()

  toggleEvents: ( eventName ) ->
    @hiddenEvents[ eventName ] = !@hiddenEvents[ eventName ]
    @deleteEvents()
    @drawEvents()
