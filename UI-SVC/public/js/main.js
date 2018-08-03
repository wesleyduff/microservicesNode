import hostmapper from '../../mappers/hostMapper';

$(function(){

    $('button').click(function(event){
        var target = $(event.currentTarget).parents('.row');
        var hook = target.data('hook');
        console.log('---- hook : ', hook)
        var hostData = hostmapper(hook);
        console.log('---- host data : ', hostData)
        var checkbox = target.find('.checkbox');

        //options?
        var options = target.find('input').length > 0 ? target.find('input').val() : null;

        eval(hostData.controller).post(hostData.host, hostData.ingestURI, options)
            .then(response => {
                console.log('----- response -> ', response)
                console.log('----- response -> ', response.data)

                if(response.data) {
                    checkbox.removeClass('disabled');
                    checkbox.find('i').switchClass('bad', 'good')
                } else {
                    checkbox.removeClass('disabled');
                    var i = checkbox.find('i');
                    if(i.hasClass('good')){
                        i.switchClass('good', 'bad')
                    }
                }
            })
            .catch(error => {
                console.log('----- error -> ', error)
                checkbox.removeClass('disabled');
                var i = checkbox.find('i');
                if(i.hasClass('good')){
                   i.switchClass('good', 'bad')
                }

            })


    })

})