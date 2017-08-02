import * as React from "react";
export interface HelpQuestionProps {
    question: string,
    answer: string,
    images: string[]
}
export default class HelpQuestion extends React.Component<HelpQuestionProps> {
    render() {
        return (
            <div className="helpQuestion">
                <p className="question"><span className="glyphicon glyphicon-asterisk"/> {this.props.question}?</p>
                <p className="answer">{this.props.answer}</p>
                {this.props.images.map((e, i) => <img src={e} key={i} />)}
            </div>
        )
    }

}