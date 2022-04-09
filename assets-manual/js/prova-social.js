$( document ).ready(function() {

        var myTime;
        var texto;
        var tempo_default = 8000;
        var tempo = 0; //tempo_default;
        var c = 0;
        var clique = 0;
        var path = 'assets-manual/files/';
        var qtd_files = 319;
        var show = true;
        var TOTAL = 13;
        var total = 0;

        $(window).on("blur focus", function(e) {
            var prevType = $(this).data("prevType");

            if (prevType != e.type) {   //  reduce double fire issues

                switch (e.type) {
                    case "blur":
                        show = false;
                        clearTimeout(myTime);
                        break;
                    case "focus":
                        show = true;
                        myTime = setTimeout(show_toast, tempo_default);
                        break;
                }
            }

            $(this).data("prevType", e.type);
        })


        function get_novo_depoimento() {
          c=c+1;
          tempo=Math.round(Math.random() * 10 + 13)*1000;
          if (c>3) {
            c=0;
            tempo=30000;
            clique=0;
          };
          i = Math.floor(Math.random()*qtd_files+1);
          var url = (path+i+".png");
          $('#img-toast').attr('src', url);
        }

        var show_toast = function() {
            if (total<=TOTAL) {
                total=total+1;
                get_novo_depoimento();
                $('#liveToast').toast('show');
                myTime = setTimeout(show_toast, tempo);
            }
        }
        myTime = setTimeout(show_toast, tempo);

        $( "#liveToastBtn" ).click(function() {
            clearTimeout(myTime);
            myTime = setTimeout(show_toast, clique*1000);
            clique+=0.25;
            total = 0;
            show = true;
        });

     });