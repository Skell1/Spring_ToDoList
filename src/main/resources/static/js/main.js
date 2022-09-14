$(function(){

    const appendTask = function(data){
        var taskCode = '<a href="#" class="task-link" data-id="' +
            data.id + '">' + data.name + '</a><br>';
        $('#task-list')
            .append('<div>' + taskCode + '</div>');
    };

    //Loading tasks on load page
//    $.get('/tasks/', function(response)
//    {
//        for(i in response) {
//            appendTask(response[i]);
//        }
//    });

    //Show adding task form
    $('#show-add-task-form').click(function(){
        $('#task-form').css('display', 'flex');
    });

    //Closing adding task form
    $('#task-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Show delete task form
    $('#show-deleteID-task-form').click(function(){
        $('#task-form-deleteID').css('display', 'flex');
    });

    //Closing delete task form
    $('#task-form-deleteID').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Show delete task form
        $('#show-putID-task-form').click(function(){
            $('#task-form-putID').css('display', 'flex');
        });

        //Closing delete task form
        $('#task-form-putID').click(function(event){
            if(event.target === this) {
                $(this).css('display', 'none');
            }
        });

    //Getting task
    $(document).on('click', '.task-link', function(){
        var link = $(this);
        var taskId = link.data('id');
        $.ajax({
            method: "GET",
            url: '/tasks/' + taskId,
            success: function(response)
            {
                var code = '<span>запланированное время: ' + response.time + '</span>';
                link.parent().append(code);
            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Заметка не найдена!');
                }
            }
        });
        return false;
    });

    //Adding task
    $('#save-task').click(function()
    {
        var data = $('#task-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/tasks/',
            data: data,
            success: function(response)
            {
                $('#task-form').css('display', 'none');
                var task = {};
                task.id = response;
                var dataArray = $('#task-form form').serializeArray();
                for(i in dataArray) {
                    task[dataArray[i]['name']] = dataArray[i]['value'];
                }
                appendTask(task);
            }
        });
        return false;
    });




    //DeleteID task
    $('#deleteID-task').click(function()
    {
           var taskd =  $('#task-form-deleteID form').serializeArray();
             var taskId = taskd[0]['value'];
            $.ajax({
                method: "DELETE",
                url: '/tasks/' + taskId,
                success: function(response)
                {
                    $('#task-form-deleteID').css('display', 'none');
                    //alert("Заметка удалена");
                },
                error: function(response)
                {
                    if(response.status == 404) {
                        alert('Заметка не найдена!');
                    }
                    if(response.status == 405) {
                        alert(taskId);
                    }
                   if(response.status == 400) {
                       alert(taskId);
                   }
                }
            });
            return false;
    });

    //PutID task
    $('#putID-task').click(function()
    {
         var taskd =  $('#task-form-putID form').serializeArray();
         var taskId = taskd[0]['value'];
         var data = $('#task-form-putID form').serialize();

            $.ajax(
            {
                method: "PUT",
                url: '/tasks/' + taskId,
                data: data,
                success: function(response)
                {
                    $('#task-form-putID').css('display', 'none');
                    alert("Заметка обновлена");
                },
                error: function(response)
                {
                   if(response.status == 404) {
                        alert('Заметка не найдена!');
                   }
                }
            });
            return false;
        });

        //Clean task
            $('#clean-task').click(function()
            {
                    $.ajax(
                    {
                        method: "DELETE",
                        url: '/tasks/',
                        success: function(response)
                        {
                            alert("Заметки удалены");
                        },
                    });
                    return false;
                });

});