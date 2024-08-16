

class HtmlTemplate{
    message = (name:string,message:string,subject:string)=>{
        return `<html>  
            <body style='color: #000; font-size: 16px; text-decoration: none; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; background-color: #efefef;'>
            <div id='logo' style='color:#E1B530;padding:10px;'>
            <center><h1 style='margin: 0px;'><img class='nav-logo' src="https://teamexoticrentals.com/assets/comp-logo-BY9clw1O.png"></h1></center>
            
        </div>
        
                <div id='wrapper' style='max-width: 600px; margin: auto auto; padding: 20px;'>

                    <div id='content' style='font-size: 16px; padding: 25px; background-color: #fff;
                        moz-border-radius: 10px; -webkit-border-radius: 10px; border-radius: 10px; -khtml-border-radius: 10px;
                        border-color: blue; border-width: 4px 1px; border-style: solid;position:relative;top:-180px;'>

                        <h1 style='font-size: 22px;'><center>${subject}</center></h1>

                        <p>From Team Exotic Rentals,</p>
                        <p>hello, ${name}</p>
                        ${message}
                        <p> 
                        Best Regards!<br>
                        Management,<br>
                        Team Exotic Rentals.

                        </p>
                        <br />
                        <p><center><a href='https://www.teamexoticrentals.com'></a></center></p>

                        <p style='display: flex; justify-content: center; margin-top: 10px;'><center>

                             </div>
                        </center></p>

                    </div>
                    <div id='footer1' style='margin-bottom: 20px; padding: 0px 8px; text-align: center;background-color: #e5e7e9; padding: 10px;position:relative;top:-180px;'>

                    Have a problem? contact us. We're active from Mondays to Fridays 8am - 5pm, then Saturdays 10am - 4pm
                    <p>
                    C/ 1575 Evergreen Ave, Juneau, Alaska 99801, USA.
                    </p>

               </div>
                    <div id='footer' style='margin-bottom: 20px; padding: 0px 8px; text-align: center;position:relative;top:-180px;'>

                         Copyright Team Exotic Rentals 2024.
                    </div>
                </div>
            </body>
        </html>`
    }
}

export default new HtmlTemplate()