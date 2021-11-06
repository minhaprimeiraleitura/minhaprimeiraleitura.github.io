$( document ).ready(function() {

        var myTime;
        var texto;
        var tempo = 8000;
        var c = 0;
        var clique = 0;
        var path = 'assets/files/';
        var qtd_files = 23;

        function get_novo_depoimento() {
          c=c+1;
          texto="TOAST "+c;
          tempo=Math.round(Math.random() * 10 + 13)*1000;
          if (c>3) {
            c=0;
            tempo=30000;
            clique=0;
          };
          i = Math.floor(Math.random()*qtd_files+1);
          var url = (path+i+".PNG");
          $('#img-toast').attr('src', url);
        }

        var show_toast = function() {
            get_novo_depoimento();
            //$("#tempo").text("ordem "+c+" tempo = "+tempo+" clic = "+clique);
            $('#liveToast').toast('show');
            myTime = setTimeout(show_toast, tempo);
        }
        myTime = setTimeout(show_toast, tempo);

        $( "#liveToastBtn" ).click(function() {
            clearTimeout(myTime);
            myTime = setTimeout(show_toast, clique*1000);
            clique+=0.25;
        });

     });