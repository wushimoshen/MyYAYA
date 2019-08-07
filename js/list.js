$(function () {
    CreatheadAndBotton();
    // 根据数据渲染页面
    let orderType = 0;
    let getList = (page) => {
        $.ajax({
            type: "post",
            url: "../api/getDatalist.php",
            data: `page=${page}&orderType=${orderType}`,
            dataType: "json",
            success: function(response) {
                console.log(response);
                // [2] 根据数据渲染页面
                var res = response.data.map(ele => {
                   return `<li data-id="${ele.gid}">
                    <a class="big_img" href="javascript:void(0)"><img src=${ele.img} alt=""></a>
                    <div class="all_small_img">
                        <a href=""><img class="samll_img" src=${ele.img} alt=""></a>
                    </div>
                    <a class="god_title">${ele.des}</a>
                    <i class="price_now">${ele.price}</i>
                    <p>已有<a href="">${ele.pingjia}</a>评价</p>
                    <div class="tool">
                            <a href="">对比</a>
                            <a href="">收藏</a>
                        </div>
                   </li>`
                }).join("");
                $(".god_list").html(res);
            }
        });

    }
    getList(0);
      //[2] 获取总页码
      $.ajax({
        type: "post",
        url: "../api/getPageCount.php",
        dataType: "json",
        success: function(response) {
            let pageSize = response.data.count;
            var res = "";
            for (let i = 0; i < pageSize; i++) {
             res += `<li>${i+1}</li>`;
            }
            $(".page_bottom").html(`
               <dl>
            <dt class="page_item">共40条</dt>
            <dd id="pre">&lt;</dd>
            <ul class="page_num">  
              ${res}
            </ul>
            <dd id="next">&gt;</dd>
        </dl>`);
        $(".page_bottom").children().children().eq(2).children().eq(0).addClass("active");
            
        }
    });
    $(".page_bottom").on("click", "li", function() {
        var index = $(this).index();
        /* (1) 设置当前标签的选中状态 */
        $(this).addClass("active").siblings().removeClass("active");
        /* (2) 发送网络更新页面 */
        getList(index);
        // console.log(this);
        
    })

    $(".god_bar li a").click(function() {
        orderType = $(this).index();
        getList(0);
    })
})