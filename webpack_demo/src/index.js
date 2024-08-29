
async function demo() {

    let p = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(11);
            resolve()
        },1000)
    })

    return p
    
}


function demo1(){
    this.demo()
    console.log('222222')
}


async function demo2(){
    await this.demo()
    console.log('3333')
}


demo1()
demo2()
demo3()