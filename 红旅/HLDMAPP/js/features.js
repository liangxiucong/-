$(function() {
    getFeatureList();
    //获取专题列表数据的
    function getFeatureList() {
        $.ajax({
            url: "http://127.0.0.1:9091/api/gettopics",
            success: function(data) {
                var html = template('featuresListTmp', { "list": data });
                $('#features').html(html);
            }
        })
    }
})
