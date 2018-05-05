import * as React from "react";
import {createActionCreator, QuoteChanged} from "../../actions/Actions";
import {connect, ActionCreator} from "react-redux";
import {QuoterState} from "../../reducers/QuoterState"

interface QuoterActions {
	changeQuote: ActionCreator<number>;
}

export interface QuoteChangeData {
	mode: ['+', '-', '=', '^'] //^ is random
	id?: number
}

class QuoterPage extends React.Component<QuoterState & QuoterActions> {

	render() {
		return (
			<div className="container" id="quoter_quotes">
				<div className="row">
					<div className="frame">
						<div className="quoter_title">#{this.props.quote} {this.props.author}:</div>
						<div className="quoter_quote">{this.props.text}</div>
						<button className="control-btn-big-big" onClick={() => this.props.changeQuote({mode: '^'})}>Случайную</button>
						<button className="control-btn" onClick={() => this.props.changeQuote({mode: '-', id: 1})}>
							<span>{"<<- Туда"}</span></button>
						<button className="control-btn" onClick={() => this.props.changeQuote({mode: '+', id: 1})}>
							<span>{"Сюда ->>"}</span></button>
						<button className="control-btn-big" onClick={() => this.props.changeQuote({mode: '=', id: parseInt((this.refs.id as HTMLInputElement).value)})}>По номеру</button>
						<input ref="id" id="id_input" type="number" placeholder="123"/>
					</div>
				</div>
			</div>
		)
	}
}

export default connect<QuoterState, QuoterActions, {}>(state => state.quoter, {
	changeQuote: createActionCreator<QuoteChangeData>(QuoteChanged)
})(QuoterPage);