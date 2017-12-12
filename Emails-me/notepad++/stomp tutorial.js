      var ws = new SockJS('http://' + window.location.hostname + ':15674/stomp');
      var client = Stomp.over(ws);
      // SockJS does not support heart-beat: disable heart-beats
      client.heartbeat.incoming = 0;
      client.heartbeat.outgoing = 0;

      client.debug = function(e) {
        $('#second div').append($("<code>").text(e));
      };

      // default receive callback to get message from temporary queues
      client.onreceive = function(m) {
        $('#first div').append($("<code>").text(m.body));

        if(m.body.substring(0,10)=="SCAN_STOP_")
        {

                var scanid=m.body.substring(10);
                $('#first div').append($("<code>").text("GOT SCAN "+scanid));
                $('#first div').append($("<code>").text("ANALYZING SCAN DATA"));
                $('#third').html("");
                $.ajax({
                    type: "POST",
                    url: "/apiproxy/api/scans/",
                    data: '{"mesh":"'+scanid+'.zip","is360Rotation":true}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data){
                        var output="<TABLE>";

                        $.each(data.scan.bras, function( index, value ) {
                                output=output+"<TR><TD>"+value.code+"</TD>";
                                output=output+"<TD>"+value.manufacturer+"</TD>";
                                output=output+"<TD>"+value.collection+"</TD>";
                                output=output+"<TD>"+value.size+"</TD>";
                                output=output+"</TR>";

                        });

                        var output=output+"</TABLE>";
                        $('#third').html(output);
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });

                }

                    var on_connect = function(x) {
                        id = client.subscribe("/exchange/pool_001/#", function(m) {
                          // reply by sending the reversed text to the temp queue defined in the "reply-to" header
                          //var reversedText = m.body.split("").reverse().join("");
                          //client.send(m.headers['reply-to'], {"content-type":"text/plain"}, reversedText);
                          client.onreceive(m);
                        });
                    };
                    var on_error =  function() {
                      console.log('error');
                    };
                    client.connect('medusa', 'm3dus4!', on_connect, on_error, '/');

                    $('#first form').submit(function() {
                      var text = $('#first form input').val();
                      if (text) {
                        client.send('/exchange/pool_001/scanner.status', {"routingKey":"scanner.status"}, text);
                          $('#first form input').val("");
                        }
                        return false;
                    });
                                          
