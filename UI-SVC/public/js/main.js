import hostmapper from '../../mappers/hostMapper';
import rootController from '../../controllers/api.root.controller';

$(function(){
    function getRouteObject(hook){
        var hostData = hostmapper(hook);

        return {hostData}
    }

    $('#runall').click(function(){
        console.dir(rootController);
        const notifcation = $('.notification');
        const notificatinIcon = notifcation.next();
        notificatinIcon.switchClass('glyphicon-asterisk', 'glyphicon-fire')
        notifcation.switchClass('standby', 'pending');
        rootController().ingestAll();
    })


    $('button').click(function(event){
        var target = $(event.currentTarget).parents('.row');
        var hook = target.data('hook');
        console.log('---- hook : ', hook)
        const { hostData } = getRouteObject(hook);
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