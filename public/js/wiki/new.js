var page = {
    //data
    ue: UE.getEditor('editor'),
    //methods
    valid() {
        var isValid = true;

        if (!$('#name').val()) {
            isValid = false;
            alert('No name');
        }

        if (!this.ue.getContent()) {
            isValid = false;
            alert('No content');
        }

        return isValid;
    },
    submit() {
        if (this.valid()) {
            $.ajax({
                type:'post', 
                url:'http://localhost:8080/wiki/new',
                dataType: 'json',
                data: {
                    name: $('#name').val(),
                    details: this.ue.getContent()
                },
                beforeSend:function(req){ 
                  //ShowLoading(); 
                }, 
                success:function(data,textStatus){ 
                  alert(JSON.stringify(data));
                }, 
                complete:function(req,textStatus){ 
                  //HideLoading(); 
                }, 
                error:function(){ 
                  //请求出错处理 
                } 
            });
        }
    }
}