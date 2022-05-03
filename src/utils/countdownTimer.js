import dayjs from 'dayjs'

export function getRemainingTime (timestamp){
    
  // console.log('distance');
    let future = new Date(timestamp)
    future.setDate(future.getDate() + 2)
    let Future = new Date(future).getTime()

    let now = new Date().getTime()
    let distance = Future-now
    
    //console.log(distance, 'distance');

   
    return {
        seconds:getRemainingSeconds(distance),
        minutes:getRemainingMinutes(distance),
        hours:getRemainingHours(distance),
        days:getRemainingDays(distance),
    }
    
}

function getRemainingSeconds (distance){
    return Math.floor((distance%(1000*60))/1000)
}

function getRemainingMinutes (distance){
    return Math.floor((distance%(1000*60*60))/(1000*60)) 
}

function getRemainingHours (distance){
    return Math.floor((distance%(1000*60*60*24))/(1000*60*60))
}

function getRemainingDays (distance){
     return Math.floor(distance/(1000*60*60*24))
}





    //Countdown timer calculator
        // let future = new Date()
        // future.setDate(future.getDate() + 1)
        // let countdownDate = new Date(future).getTime()
       // console.log('future is', future, 'while countdown is ', countdownDate);

       
        // let x = setInterval(function(){
        //     let now = new Date().getTime()
        //     let distance = countdownDate-now
    
        //     let days = Math.floor(distance/(1000*60*60*24))
        //     let hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60))
        //     let minutes = Math.floor((distance%(1000*60*60))/(1000*60)) 
        //     let seconds =  Math.floor((distance%(1000*60))/1000)

        //     const clone = {...timer}
        //     clone['days'] = days
        //     clone['hours'] = hours
        //     clone['minutes'] = minutes
        //     clone['seconds'] = seconds
        //     setTimer(clone)
    
            // console.log(days, hours, minutes, seconds);
            // if(distance < 0){
            //     clearInterval(x)
            //     alert('Item expired')
            // }
        // }, 1000)
        //------------------------------


    //http://localhost:3000/haiku/62631517df1498326647107a

