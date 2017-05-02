import * as React from "react";
import {connect} from "react-redux";

export interface RegisterProps {
    username: string;
    wf_username: string;
    email: string;
    password: string;
}
export class RegisterPage extends React.Component<RegisterProps, {}> {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <p className="reg-title text-left">Регистрация: <span id="reg-output"></span></p>
                    <input type="text" className="inp inp-half" name="username" id="username" placeholder="Username... " />
                    <input type="text" className="inp inp-half" name="wf_username" id="wf_username" placeholder="Warframe username... " />
                    <br />
                    <input type="email" className="inp inp-full" name="email" id="email" placeholder="E-Mail..." />
                    <br />
                    <input type="password" className="inp inp-half" name="password" id="password" placeholder="Password ..." />
                    <input type="password" className="inp inp-half" name="repassword" id="repassword" placeholder="Retry password..." />
                    <br />
                    <button onClick={this.register} id="regiter" className="btn btn-reg inp-full">Зарегестрироваться</button> 
                </div>
            </div>
        )
    }
    register() {
        var input_data = {
            username: $("#username"),
            wf_username: $("#wf_username"),
            email: $("#email"),
            password: $("#password"),
            repassword: $("#repassword")
        };
        var errors:string = "";
        for(var k in input_data){
            if(input_data.hasOwnProperty(k)){
                var el:JQuery = input_data[k];
                if(el.val() == null || el.val() == undefined || el.val().length == 0) {
                    errors += el.attr("name") + " ";
                }
            }
        }
        if(errors.length != 0){
            $("#reg-output").html("Поля " + errors + "должны быть введены");
            return;
        }
        if(input_data.password.val() != input_data.repassword.val()) {
            $("#reg-output").html("Пароли должны совпадать");
            return;
        }
        //Тут проверка на наличие в БД логина, wf_логина и емэйла
        $("#reg-output").html("Регистрация...");
        $("#reg-output").css("color", "#00ff1d");
        //Собственно регистрация
        $("#reg-output").html("Успешно! Теперь вы можете войти в свой аккаунт во вкладке 'Войти'");
    }
}


export default connect<{}, {}, {}>(state => {return {};})(RegisterPage);