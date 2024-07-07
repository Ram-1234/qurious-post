export const postStyles={
    title:{
        fontFamily: `"SharpGrotesk", myriad-pro, Arial, sans-serif`,
        fontSize: "4.6875rem",
        fontWeight: 500,
        letterSpacing: "0.15938rem",
        lineHeight: "1.02667",
        color:"red"
    }
} 

export const themeStyle={width:"100%", height:"600px",objectFit: "cover", border:"2px solid green"}

export const timeFormat=(timeStamp, format)=>{
    let time = new Date(timeStamp||null);
    // year 
    let year = time.getFullYear();
    // date
    let date = time.getDate();
    // month
    let month = time.getMonth();
    let months={
        "0": "January",
        "1": "February",
        "2": "March",
        "3": "April",
        "4": "May",
        "5": "June",
        "6": "July",
        "7": "August",
        "8": "September",
        "9": "October",
        "10": "November",
        "11": "December"
    }
  
    // Thu Jun 20 2024
    let formate1 = time.toDateString();
    // 12:42:12 PM
    let formate2 = time.toLocaleTimeString('en');
    //Thu, 20 Jun 2024 11:06:13 GMT
    let formate3 = time.toUTCString('en');
    //20/6/2024, 4:38:21 pm
    let formate4 = time.toLocaleString();
    //June 20,2024 4:59:02 PM
    let formate5 = months[month]+" "+date+","+year+" "+formate2;
    //console.log(formate5);

    switch(format){
            case "WW MM DD YY":
                return formate1
            case "HH:MM:SS EN":
                return formate2  
            case "WW, DD MM YY HH:MM:SS GMT":
                return formate3
            case "DD/DD/YY, HH:MM:SS EN":
                return formate4
            case "MM DD, YY HH:MM:SS EN":
                return formate5;          
            default:
                return time;
    }
}

timeFormat("WW MM DD YY");