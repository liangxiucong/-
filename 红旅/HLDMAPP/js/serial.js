$(function() {
    getSerialList();
    //获取连载动漫列表
    function getSerialList() {
        $.ajax({
            url: "http://127.0.0.1:9091/api/getlianzai",
            success: function(data) {
            	var html = template('serialListTmp',{"list":data});
            	$('#serial').html(html);
            }
        })
    }
})
