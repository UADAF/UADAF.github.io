import * as React from "react";
import HelpQuestion from "../Misc/HelpQuestion"
import {HelpQuestionProps} from "../Misc/HelpQuestion";
import {connect} from "react-redux";

export interface HelpPageProps {
    question: HelpQuestionProps[]
}
export class HelpPage extends React.Component<HelpPageProps, {}> {
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.props.question.map((e, i) => <HelpQuestion key={i} {...e}/> )}
                </div>
            </div>
        )
    }
}
export default connect<HelpPageProps, {}, {}>(state => {return {question: state.question}})(HelpPage);