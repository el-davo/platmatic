import * as React from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import * as dateFormat from 'dateformat';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { get, takeRight } from 'lodash';
import { LoadingComponent } from '../../common/loading.component';
import { chartLineColors } from './charLinesColors.constants';

let memoryChartData = [];
let latestMem = [];

interface props {
	appStats: any;
	guid: string;
}

export class AppMemoryChartComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	componentWillUnmount() {
		memoryChartData = [];
	}

	componentDidUpdate() {
		let mems = Object.keys(this.props.appStats.stats).map((key) => {
			let mem: number = this.props.appStats.stats[key].stats.usage.mem / (1024 * 1024);
			return { mem: parseFloat(mem.toFixed(2)), instance: key };
		});

		let memoryUpdate = takeRight(memoryChartData, 20);
		let newMemory = { name: dateFormat(new Date(), 'HH:MM:ss') };
		latestMem = mems;

		mems.forEach((mem) => {
			newMemory[mem.instance] = mem.mem;
		});

		memoryUpdate.push(newMemory);
		memoryChartData = memoryUpdate;
	}

	render() {
		return (
			<Card>
				<CardHeader title="Memory" />
				<CardText style={{ height: 300 }}>
					{
						memoryChartData.length > 1 ? (
							<ResponsiveContainer width={'100%'} height={300}>
								<LineChart data={memoryChartData}
									height={200}
									margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
									<XAxis dataKey="name" />
									<YAxis label="MB" />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									<Legend />
									{
										latestMem.map((mem, key) => {
											return <Line key={key}
												isAnimationActive={false}
												type="monotone"
												dataKey={key}
												activeDot={{ r: 8 }}
												stroke={chartLineColors[key]} />
										})
									}
								</LineChart>
							</ResponsiveContainer>
						) : (
								<div style={{ height: 150, textAlign: 'center' }}>
									<LoadingComponent />
								</div>
							)
					}
				</CardText>
			</Card>
		)
	}
}
