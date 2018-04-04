let a='hello'
var promise=new Promise(resolve,reject){
    if(a){
    	resolve('it works')
    }else{
    	reject('ops')
    }
}

promise.then(function(result){
	 console.log(result)
})
console.log('what the fuck!!!!');

