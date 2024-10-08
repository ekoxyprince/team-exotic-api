"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HtmlTemplate {
    constructor() {
        this.message = (name, message, subject) => {
            return ` <div style="background: #f5f5f9; width: 100%; height: 100%; ">
        <center>
            <div style="width: 100%; height: auto;">
               <img src="https://teamexoticrentals.com/assets/comp-logo-BY9clw1O.png" alt="Goldmarketinc"/>
            </div>
         <div style="width: 92%; height: 200px; background: #fff; padding: 30px 15px; border-radius: 14px;">
           <h2 style="text-align: center; color: #807b7b; font-family: sans-serif; font-size: 18px; font-weight: 600;">${subject}</h2>
           <p style="text-align: justify; margin-left: 20px;">Hello ${name},</p>
           <p style="text-align: justify; margin:0 15px;">${message}</p>
         </div>
         <div style="width: 90%;">
            <p style="font-size: 13.5px; color: #807b7b; font-weight: 700; margin-left: 20px;">TeamExoticRentals, United states.</p>
            <p style="font-size: 12px; color: #807b7b; font-weight: 600; margin-left: 15px;">© 2023 Goldmarketinc, All Rights Reserved.</p>
         </div>
        </center>
    </div>`;
        };
    }
}
exports.default = new HtmlTemplate();
