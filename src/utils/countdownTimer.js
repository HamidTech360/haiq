import dayjs from 'dayjs'

export function getRemainingTime (timestamp){

   
    let future = new Date('2022-06-26T11:10:35.192+00:00')
    // future.setDate(future.getDate() + 5)
    let countdownDate = new Date(future).getTime()

    let past = new Date(timestamp).getTime()
    let distance = countdownDate-past

    const remHours = new Date (timestamp).getHours()
    const countDownHours = new Date (future).getHours()
    const hrDistance = countDownHours-remHours
    
    //console.log(distance);

   
    return {
        seconds:getRemainingSeconds(distance),
        minutes:getRemainingMinutes(distance),
        hours:getRemainingHours(hrDistance),
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

