import * as React from "react";
export interface ITHLoginProps {
}
export class LoginPage extends React.Component<ITHLoginProps, {}> {
    render() {
        return (
                <div className="container login" id="ith_login">
                    <div className="row text-center">
                        <div className="frame">
                            <input type="login" id="login" placeholder="Login..." /><input type="submit" className="" value="Войти" />
                        </div>
                    </div>
                </div>
        )
    }
}
//export default connect<ITHProps, {}, {}>(state => {return {question: state.question}})(HelpPage);