// var request = require('sync-request')
// var cheerio = require('cheerio')
// var res = request('GET', 'http://zhjw.scu.edu.cn/', {
//     headers: {

//         Cookie: '  ${iPlanetDirectoryPro};',

//     }
// })

// // var jessionId = res.headers['set-cookie'][0]
// // console.log(jessionId)
// // res = request('GET', 'http://zhjw.scu.edu.cn/login', {
// //     headers: {
// //         Referer: 'http://jwc.scu.edu.cn/',
// //         Cookie: ` ${iPlanetDirectoryPro}; ${jessionId}`,
// //         'Upgrade-Insecure-Requests': 1
// //     }
// // })
// // jessionId = res.headers['set-cookie'][0]
// // console.log(jessionId)
// // res = request('GET', 'http://zhjw.scu.edu.cn/casLogin', {
// //     headers: {

// //         Cookie: ` ${iPlanetDirectoryPro}; ${jessionId}`,
// //         'Upgrade-Insecure-Requests': 1
// //     }
// // })

// // res = request('POST', 'http://zhjw.scu.edu.cn/j_spring_security_check', {
// //     headers: {

// //         Cookie: ` ${iPlanetDirectoryPro}; ${jessionId}`,
// //         'Upgrade-Insecure-Requests': 1,

// //     },
// //     body:
// //        ' j_username=2018141463137&j_password=1&j_captcha='



// // })

// console.log(res.headers)
// console.log(res.getBody('utf8'))



const request = require('request')
const util = require('util')
const figlet = require('figlet');
const cheerio = require('cheerio')
const fs = require('fs')
const tesseract = require('node-tesseract');
var username
var password
var cnt = 1
var readline = require('readline');
const {
    resolve
} = require('path');

var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "20306566";
var API_KEY = "nDdQ8OAo9ekBjLspLS89reCn";
var SECRET_KEY = "wfdtIUC2YvyL0SnN9HGU2rhndgtoLZhM";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);





//创建readline接口实例
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const question = (query) => new Promise(resolve => rl.question(query, (answer) => resolve(answer)))

function showImage() {
    console.log([
        "                                  ____",
        "             ___  __ _ ___ _   _ / ___|___  _   _ _ __ ___  ___ ",
        "             / _ \\/ _` / __| | | | |   / _ \\| | | | '__/ __|/ _ \\ ",
        "            |  __/ (_| \\__ \\ |_| | |__| (_) | |_| | |  \\__ \\  __/",
        "             \\___|\\__,_|___/\\__, |\\____\\___/ \\__,_|_|  |___/\\___|",
        "                           |___/",
    ].join('\n'));
    console.log('    ---------------------- easyCourse by zhp ---------------------- \n')
    console.log([
        "...,,,,,,,,,,,,,,,,,,,,,,,,**,******************,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,",
        "     .........,,,,,,,,,,,,,,,,,,**,**/////*******,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,,",
        "   ...............,,,,,,,,,,****/(##%#%#(##%&&&&&%/*,,,,,,,,,,,,,,.............",
        "..........,,,,,,,,,,,,,*/##((/((#(((/((((##&&&&&&@@&&#,,,,*(###*,,,............",
        "...,,...,,,,,,,,,,,,,*(%%%#(#(((#(#/####%%&&&&&@@@@@@@@&%%%&%%#*...............",
        ".,,,,,,,,,,,,,,,,,,,/&&&&%&&&%%##((%&%&&@@&@&&&&&@@@@@@@&%%####*...............",
        ".,,,,,,,,,,,,,,,,,,#&&&&@@&@@&&@&&&&&&@@@@@@@@@@&&@@@@@@@&%###(*,............. ",
        ".,,,,,,,,,,,,,,,,,#&&&&&@@@@&&&&&&%&&&&&&@@@@@@@@&@@@@@@@&%###**......... .....",
        "..,,,,,,,,,,,,,,,*&&&&&&&&&&&%%%&&%%%%%&&&&@@@@@@@@@@@@@@@&%##/*...............",
        " ..........,,,,,,,#&&&&&@@@&&%####%%##%%#%%&&@@@@@@@@@@@@@@&%##/*...............",
        " ............,,,,,%&&&&@@&&&%%((((#%#((%%#%&&&@@@@&&@@@@@@@@%##(/,..............",
        " .......,,,,,,,,,*%&&&&@&&%%#((////(((((((%##%&&&@@&%&@@@@@@&###(,..............",
        " ....,,,,,,,,,,,,*%&&&&%(///////***/////((####(#%&&&&%&&&&%&&%##(,..............",
        " .......,,,,,,,,,,(&&&@&((#/(%#//**////((/%&##((#%%%###%#%%%@&%#(,..............",
        " ,,,,,,,,,,,,,,,,,/%%/&&(////(///**/////////////(###((#%#%&@@%%##,..............",
        " ,,,,,,,,,,,*/,,,,/%##/(*///////////((//********//((####%&@@@&%%#,..............",
        " ,,,,,,,,,,,,,,,,,*#//(//*,,,,,,,,*************///(#%##&@@@@@&&%#,..............",
        " ,,,,,,,,,,,,,,,,*///**/(/*****,***///////*******///#%#@@@@@@@@@%*,,............",
        " ,,,,,,,,,,,,,,,**/****/((/*****,,***///////////*/((/(&@@@@@@@@@@%/,,...........",
        " ,,,,,,,,,,,,,,,,*/*****/((*************////////////#%@@@@@@@@@@@@@&#*,,........",
        " ,,,,,,,,,,,,,,*,******,,.,*,*********/////***////#%%%@@@@@@@@@@@@@&&&%(*,,.....",
        " ,,,,,,,,,,,,,***,     .,/************//**/////(###%#&&@@@@@@@@@&&&&%%(//(#/,,,,",
        " ,,,,,,,,,,,,,,.  . .,..**,*,,,*/(*****/////((((####%%&&@@@@@@@&%%%##(/***,,,**,",
        ",,,,,,,,,,,,    .....,,*,,,,,,*/(///#(////(((((((###%%%@@@@@@@&%%##(/***,,,.,,,",
        " ,,,,,,,,.   .  .,*/*,,,*,,,*,.*/(///(#(/////(((((#####%%@@@@@@@&%###(//*////*,,",
    ].join('\n'))
    console.log('\n    ---------------------- Dedicated to My Beloved. ----------------------')
}

function showIntro() {
    console.log([
        '   欢迎使用easyCourse',
        '   使用说明：',
        '   输入学号和‘川大信息门户的密码’(不是教务处密码)',
        "   输入需要选择的课程号即可开始",
        "   每30秒刷新一次",
        "   其他说明：",
        "   使用信息门户中心主要是绕过教务处的验证码验证",
        "   也对使用者的隐私给予一定程度的保护",
        "   本软件不存在信息泄露问题，欢迎用wireshark抓包验证",
        "   有任何问题，请联系邮箱：harryzhp03@gmail.com",
        "   如果你觉得满意，欢迎打赏点奶茶钱: https://s1.ax1x.com/2020/06/09/t4VmtI.png"
    ].join('\n'))
}

function loading() {
    var P = ["\\", "|", "/", "-"];
    var x = 0;
    return setInterval(function () {
        process.stdout.write(`\r \x20 \x20 \x20 \x20 \x20 \x20 \x20 \x20 \x20 \x20 \x20 \x20 [ 加载中 ${P[x++]} ]`);
        x &= 3;
    }, 250);
};


function getJessionId(username, password) {
    console.log(`Lets Begin`)
    return new Promise((resolve, reject) => {
        var jessionId
        var iPlanetDirectoryPro
        request({
            url: 'http://ids.scu.edu.cn/amserver/UI/Login',
            method: 'POST',

            form: `IDToken0=&IDToken1=${username}&IDToken2=${password}`
        }, (err, res, body) => {
            iPlanetDirectoryPro = res.headers['set-cookie'][2]
            request({
                url: 'http://zhjw.scu.edu.cn/',
                method: 'GET',
                headers: {
                    Cookie: ` ${iPlanetDirectoryPro};`
                }
            }, (err, res, body) => {
                jessionId = res.headers['set-cookie'][0]
                request({
                    url: 'http://zhjw.scu.edu.cn/login',
                    method: 'GET',
                    headers: {
                        Cookie: `  ${iPlanetDirectoryPro}; ${res.headers['set-cookie'][0]}`
                    }
                }, (err, res, body) => {
                    request({
                        url: 'http://zhjw.scu.edu.cn/j_spring_security_check',
                        method: 'POST',
                        headers: {
                            Cookie: `  ${iPlanetDirectoryPro}; ${jessionId}`
                        },
                        form: `j_username=${username}&j_password=1&j_captcha=`
                    }, (err, res, body) => {
                        if (body == 'The URL has moved <a href="http://zhjw.scu.edu.cn/index.jsp">here</a>\n')
                            resolve(jessionId)
                        else
                            console.log('没有拿到JESSIONID,请重试'), console.log(`如果重试没有成功，请将下面打印出的信息发送到我的邮箱：${body}`)

                    })
                })
            })

        })
    })
}

function getClass(jessionId, classId, kxId) {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://zhjw.scu.edu.cn/student/courseSelect/courseSelect/index',
            method: 'GET',
            headers: {
                Cookie: `${jessionId}`
            },
        }, (err, res, body) => {
            $ = cheerio.load(body)
            let token = $('#tokenValue').val()
            console.log('token为：' + token)
            let form = `dealType=5&kcIds=${classId}%400${kxId}%402020-2021-1-1&tokenValue=${token}`
            console.log(form)
            request({
                url: 'http://zhjw.scu.edu.cn/student/courseSelect/selectCourse/checkInputCodeAndSubmit',
                method: 'POST',
                headers: {
                    Cookie: `${jessionId}`
                },
                form: `dealType=5&kcIds=${classId}%400${kxId}%402020-2021-1-1&tokenValue=${token}`
            }, (err, res, body) => {

                resolve(JSON.parse(body)['result'])


            })

        })
    })
}

function getClassWithYzm(jessionId, classId, kxId, inputCode) {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://zhjw.scu.edu.cn/student/courseSelect/courseSelect/index',
            method: 'GET',
            headers: {
                Cookie: `${jessionId}`
            },
        }, (err, res, body) => {
            $ = cheerio.load(body)
            let token = $('#tokenValue').val()
            console.log('token为：' + token)
            let form = `dealType=5&kcIds=${classId}%400${kxId}%402020-2021-1-1&inputCode=${inputCode}&tokenValue=${token}`
            console.log(form)
            request({
                url: 'http://zhjw.scu.edu.cn/student/courseSelect/selectCourse/checkInputCodeAndSubmit',
                method: 'POST',
                headers: {
                    Cookie: `${jessionId}`
                },
                form: `dealType=5&kcIds=${classId}%400${kxId}%402020-2021-1-1&inputCode=${inputCode}&tokenValue=${token}`
            }, (err, res, body) => {

                resolve(JSON.parse(body)['result'])


            })

        })
    })
}

function Judge(jessionId, classId, kxId, username) {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://zhjw.scu.edu.cn/student/courseSelect/selectCourses/waitingfor',
            method: "POST",
            headers: {
                Cookie: `${jessionId}`
            },
            form: `dealType=5&kcIds=${classId}%400${kxId}%402020-2021-1-1`
        }, (err, res, body) => {
            console.log(`kcNum=${kxId}&redisKey=${username}5`)
            request({
                url: 'http://zhjw.scu.edu.cn/student/courseSelect/selectResult/query',
                method: "POST",
                headers: {
                    Cookie: `${jessionId}`
                },
                form: `kcNum=${kxId}&redisKey=${username}5`
            }, (err, res, body) => {
                if (body.indexOf('选课成功') != -1)
                    resolve('选课成功！')
                else resolve(JSON.parse(body)['result'])
            })
        })
    })
}





function getYMZ(jessionId) {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://zhjw.scu.edu.cn/student/courseSelect/selectCourse/getYzmPic?time=100',
            method: 'GET',
            headers: {
                Cookie: `${jessionId}`
            },

        }, (err, res, body) => {}).pipe(fs.createWriteStream('./yxm.png')).on('close', () => {
            var image = fs.readFileSync("./yxm.png").toString("base64");
            const formData = {
                'user': 'Harryzhp',
                'pass': '721721',
                'softid': '905755',
                'codetype': '1004',
                'file_base64': image
            };
            request({
                url: 'http://upload.chaojiying.net/Upload/Processing.php',
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(formData)
            }, (err, res, body) => {
                resolve(JSON.parse(body)['pic_str'])
                console.log(JSON.parse(body)['pic_str'])
            })
        });
    })

}

async function duplicatedAsk(jessionId, classId, kxId, username) {
    return new Promise(async (resolve, reject) => {
        if (cnt == 1) {
            let classres = await getClass(jessionId, classId, kxId)
            if (classres == '验证码不能为空！') {
                console.log('需要识别验证码')
                let yzm = await getYMZ(jessionId)
                let ans = await getClassWithYzm(jessionId, classId, kxId, yzm)
                console.log(ans)
                if (ans == 'ok') { //进入验证部分
                    let ans = await Judge(jessionId, classId, kxId, username)
                    resolve(ans)
                } else
                    resolve('出了点问题，将下面报错信息联系前面给出的邮箱' + ans)
            } else if (classres == 'ok') {
                let ans = await Judge(jessionId, classId, kxId, username)
                resolve(ans)
            } else resolve('出了点问题，将下面报错信息联系前面给出的邮箱' + ans)
        } else {
            setTimeout(async () => {
                let classres = await getClass(jessionId, classId, kxId)
                if (classres == '验证码不能为空！') {
                    console.log('需要识别验证码')
                    let yzm = await getYMZ(jessionId)
                    let ans = await getClassWithYzm(jessionId, classId, kxId, yzm)
                    console.log(ans)
                    if (ans == 'ok') { //进入验证部分
                        let ans = await Judge(jessionId, classId, kxId, username)
                        resolve(ans)
                    } else
                        resolve('出了点问题，将下面报错信息联系前面给出的邮箱' + ans)
                } else if (classres == 'ok') {
                    let ans = await Judge(jessionId, classId, kxId, username)
                    resolve(ans)
                } else resolve('出了点问题，将下面报错信息联系前面给出的邮箱' + ans)


            }, 30000);
        }
    })
}

async function main() {
    showImage()
    showIntro()
    console.log()
    username = await question('输入学号：');
    password = await question('输入课程中心(信息门户中心)密码：')
    var jessionId = await getJessionId(username, password)

    console.log(`\x1B[32m成功登陆！`)
    console.log('\x1B[0m' + jessionId)
    let classId = await question('输入需要选择的课程号：')
    let kxId = await question('输入需要选择的课序号：(请将01写作1，02写作2)：')
    console.log([
        `课程号：${classId}`,
        `课序号：${kxId}`,
    ].join('\n'))

    while (true) {
        var jessionId = await getJessionId(username, password)
        console.log(`\x1B[32m拿到了JESSIONID!`)
        console.log('\x1B[0m' + jessionId)
        let ans = await duplicatedAsk(jessionId, classId, kxId, username)
        if (ans == '选课成功！') {
            console.log("选课成功！")
            break;
        } else {
            console.log(`第${cnt}次尝试`)
            console.log(`输出结果为：${ans}`)
            cnt++;
        }
    }


}




main()