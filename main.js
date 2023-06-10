/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

//弹窗样式
iziToast.settings({
    timeout: 10000,
    progressBar: false,
    close: false,
    closeOnEscape: true,
    position: "topCenter",
    transitionIn: "bounceInDown",
    transitionOut: "flipOutX",
    displayMode: "replace",
    layout: "1",
    backgroundColor: "#00000040",
    titleColor: "#efefef",
    messageColor: "#efefef",
    icon: "Fontawesome",
    iconColor: "#efefef",
});

/* 鼠标样式 */
const body = document.querySelector("body");
const element = document.getElementById("g-pointer-1");
const element2 = document.getElementById("g-pointer-2");
const halfAlementWidth = element.offsetWidth / 2;
const halfAlementWidth2 = element2.offsetWidth / 2;

function setPosition(x, y) {
    element2.style.transform = `translate(${x - halfAlementWidth2 + 1}px, ${y - halfAlementWidth2 + 1
        }px)`;
}

body.addEventListener("mousemove", (e) => {
    window.requestAnimationFrame(() => {
        setPosition(e.clientX, e.clientY);
    });
});

//加载完成后执行
// window.addEventListener("load", () => {
setTimeout(() => {
    //载入动画
    $("#loading-box").attr("class", "loaded");
    $("#bg").css(
        "cssText",
        "transform: scale(1);filter: blur(0px);transition: ease 1.5s;"
    );
    $(".cover").css("cssText", "opacity: 1;transition: ease 1.5s;");
    $("#section").css(
        "cssText",
        "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important"
    );

    //用户欢迎
    setTimeout(() => {
        iziToast.show({
            timeout: 2500,
            icon: false,
            title: hello,
            message: "欢迎来到我的主页",
        });
    }, 800);

    //延迟加载音乐播放器
    // let element = document.createElement("script");
    // element.src = "./js/music.js";
    // document.body.appendChild(element);

    //中文字体缓加载-此处写入字体源文件 （暂时弃用）
    //先行加载简体中文子集，后续补全字集
    //由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
    // const font = new FontFace(
    //     "MiSans",
    //     "url(" + "./font/MiSans-Regular.woff2" + ")"
    // );
    // document.fonts.add(font);

    //移动端去除鼠标样式
    if (Boolean(window.navigator.userAgent.match(/AppWebKit.*Mobile.*/))) {
        $("#g-pointer-2").css("display", "none");
    }
    // }, false);
}, 500);

setTimeout(() => {
    $("#loading-text").html("字体及文件加载可能需要一定时间");
}, 3000);

//获取一言
fetch("https://v1.hitokoto.cn?max_length=24")
    .then((response) => response.json())
    .then((data) => {
        $("#hitokoto_text").html(data.hitokoto);
        $("#from_text").html(data.from);
    })
    .catch(console.error);

let times = 0;
$("#hitokoto").click(() => {
    if (times == 0) {
        times = 1;
        let index = setInterval(() => {
            times--;
            if (times == 0) {
                clearInterval(index);
            }
        }, 1000);
        fetch("https://v1.hitokoto.cn?max_length=24")
            .then((response) => response.json())
            .then((data) => {
                $("#hitokoto_text").html(data.hitokoto);
                $("#from_text").html(data.from);
            })
            .catch(console.error);
    } else {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: "点击太快了哦",
        });
    }
});

// 获取天气
// 请前往 https://www.mxnzp.com/doc/list 申请 app_id 和 app_secret
// const mainKey = "c577e8a40049cf51879ff72c9dc1ae8e"; // 高德开发者 Key
function getWeather() {
    // fetch(`https://restapi.amap.com/v3/ip?key=${mainKey}`)
    fetch(`https://api.andeer.top/API/daygas.php?msg=%E6%B1%89%E5%B7%9D&b=1`)
        .then((response) => response.json())
        .then((res) => {
            if (res.code) {
                $("#city_text").html(res.data.城市);
                $("#wea_text").html(res.data.天气);
                $("#tem_text").html(res.data.温度);
                $("#win_text").html((res.data.风度).split("-")[0]);
                $("#win_speed").html((res.data.风度).split("-")[1]);
            } else {
                console.error("天气信息获取失败");
                iziToast.show({
                    timeout: 2000,
                    icon: "fa-solid fa-cloud-sun",
                    message: "天气信息获取失败",
                });
            }
        });
};

getWeather();

let wea = 0;
$("#upWeather").click(() => {
    if (wea == 0) {
        wea = 1;
        let index = setInterval(() => {
            wea--;
            if (wea == 0) {
                clearInterval(index);
            }
        }, 60000);
        getWeather();
        iziToast.show({
            timeout: 2000,
            icon: "fa-solid fa-cloud-sun",
            message: "实时天气已更新",
        });
    } else {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: "请稍后再更新哦",
        });
    }
});

//获取时间
let t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    let dt = new Date();
    let year = dt.getFullYear();
    let mouth = dt.getMonth() + 1;
    let date = dt.getDate();
    let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let day = dt.getDay();
    let hour = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
    let minute = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
    let second = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();

    if ($(".nowdate").html() != `${year} 年 ${mouth} 月 ${date} 日`) $(".nowdate").html(`${year} 年 ${mouth} 月 ${date} 日`);
    if ($(".weekday").html() != weekday[day]) $(".weekday").html(weekday[day]);
    if ($(".hour").html() != hour) $(".hour").html(hour);
    if ($(".minute").html() != minute) $(".minute").html(minute);
    $(".second").html(second);
    t = setTimeout(time, 1000 - dt.getUTCMilliseconds());
}

//链接提示文字
$("#social")
    .mouseover(() => {
        $("#social").css({
            background: "rgb(0 0 0 / 25%)",
            "border-radius": "6px",
            "backdrop-filter": "blur(5px)",
        });
        $("#link-text").css({
            display: "block",
        });
    })
    .mouseout(() => {
        $("#social").css({
            background: "none",
            "border-radius": "6px",
            "backdrop-filter": "none",
        });
        $("#link-text").css({
            display: "none",
        });
    });

$("#github")
    .mouseover(() => {
        $("#link-text").html("去 Github 看看");
    })
    .mouseout(() => {
        $("#link-text").html("通过这里联系我");
    });
$("#qq")
    .mouseover(() => {
        $("#link-text").html("有什么事吗");
    })
    .mouseout(() => {
        $("#link-text").html("通过这里联系我");
    });
$("#email")
    .mouseover(() => {
        $("#link-text").html("来封 Email");
    })
    .mouseout(() => {
        $("#link-text").html("通过这里联系我");
    });
$("#bilibili")
    .mouseover(() => {
        $("#link-text").html("来 B 站看看 ~");
    })
    .mouseout(() => {
        $("#link-text").html("通过这里联系我");
    });
$("#telegram")
    .mouseover(() => {
        $("#link-text").html("你懂的 ~");
    })
    .mouseout(() => {
        $("#link-text").html("通过这里联系我");
    });

//更多页面切换
let shoemore = false;
$("#switchmore").on("click", () => {
    shoemore = !shoemore;
    if (shoemore && $(document).width() >= 990) {
        $("#container").attr("class", "container mores");
        $("#change").html("Oops !");
        $("#change1").html("哎呀，这都被你发现了（ 再点击一次可关闭 ）");
    } else {
        $("#container").attr("class", "container");
        $("#change").html("よこそう！");
        $("#change1").html("咲き、花たち！");
    }
});

//更多页面关闭按钮
$("#close").on("click", () => {
    $("#switchmore").click();
});

//移动端菜单栏切换
let switchmenu = false;
$("#switchmenu").on("click", () => {
    switchmenu = !switchmenu;
    if (switchmenu) {
        $("#row").attr("class", "row menus");
        $("#menu").html("<i class='fa-solid fa-xmark'></i>");
    } else {
        $("#row").attr("class", "row");
        $("#menu").html("<i class='fa-solid fa-bars'></i>");
    }
});

//更多弹窗页面
$("#openmore").on("click", () => {
    $("#box").css("display", "block");
    $("#row").css("display", "none");
    $("#more").css("cssText", "display:none !important");
});
$("#closemore").on("click", () => {
    $("#box").css("display", "none");
    $("#row").css("display", "flex");
    $("#more").css("display", "flex");
});

//监听网页宽度
window.addEventListener("load", () => {
    window.addEventListener("resize", () => {
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            $("#row").attr("class", "row");
            $("#menu").html("<i class='fa-solid fa-bars'></i>");
            //移除移动端切换功能区
            $("#rightone").attr("class", "row rightone");
        }

        if (window.innerWidth <= 990) {
            //移动端隐藏更多页面
            $("#container").attr("class", "container");
            $("#change").html("よこそう！");
            $("#change1").html("咲き、花たち！");

            //移动端隐藏弹窗页面
            $("#box").css("display", "none");
            $("#row").css("display", "flex");
            $("#more").css("display", "flex");
        }
    });
});

//移动端切换功能区
let changemore = false;
$("#changemore").on("click", () => {
    changemore = !changemore;
    if (changemore) {
        $("#rightone").attr("class", "row menus mobile");
    } else {
        $("#rightone").attr("class", "row menus");
    }
});

//更多页面显示关闭按钮
$("#more").hover(
    function () {
        $("#close").css("display", "block");
    },
    function () {
        $("#close").css("display", "none");
    }
);

//屏蔽右键
document.oncontextmenu = () => {
    iziToast.show({
        timeout: 2000,
        icon: "fa-solid fa-circle-exclamation",
        message: "为了浏览体验，本站禁用右键",
    });
    return false;
};
